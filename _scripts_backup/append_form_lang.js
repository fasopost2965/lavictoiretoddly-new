const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Commands to run
    // Edit the lang/fr/site.php file to append the form keys if they don't exist
    const phpScript = `<?php
    $langPath = __DIR__.'/lang/fr/site.php';
    if (!file_exists($langPath)) {
        die("lang/fr/site.php not found.");
    }
    
    $content = file_get_contents($langPath);
    
    // Check if form_firstname is already in there
    if (strpos($content, "'form_firstname'") === false) {
        $lineToAppend = "
    // Formulaire de Contact
    'form_firstname' => 'Prénom',
    'form_firstname_ph' => 'Votre prénom',
    'form_lastname' => 'Nom',
    'form_lastname_ph' => 'Votre nom',
    'form_email_ph' => 'Adresse e-mail',
    'form_phone' => 'Téléphone',
    'form_subject' => 'Sujet de votre demande',
    'form_subject_ph' => 'Sélectionnez un sujet',

    // Dropdown options
    'form_opt_friendly' => 'Organisation de matchs amicaux',
    'form_opt_fifa' => 'Journées FIFA',
    'form_opt_camp' => 'Camp d\\'entraînement',
    'form_opt_logistics' => 'Logistique & accompagnement',
    'form_opt_contract' => 'Négociation contractuelle',
    'form_opt_event' => 'Événement sportif',
    'form_opt_marketing' => 'Marketing sportif',
    'form_opt_other' => 'Autre demande',

    'form_message' => 'Votre message',
    'form_message_ph' => 'Rédigez votre message ici...',
    'form_submit' => 'Envoyer le message',
    'form_sending' => 'Envoi en cours...',

    // Notifications
    'contact_success_title' => 'Message envoyé!',
    'contact_success_desc' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
    'contact_error_title' => 'Erreur d\\'envoi',
    'contact_error_desc' => 'Une erreur est survenue lors de l\\'envoi de votre message.',
    'contact_error_hint' => 'Veuillez réessayer plus tard ou nous contacter directement via',

    'lang_switch_full' => 'Français',
];";
        
        // Remove the last ]; from the original file
        if (preg_match('/\];\s*$/m', $content, $matches, PREG_OFFSET_CAPTURE)) {
            $content = substr($content, 0, $matches[0][1]);
            $content .= $lineToAppend;
            file_put_contents($langPath, $content);
            echo "Form translations injected successfully.\\n";
        } else {
            echo "Could not find closing bracket in lang/fr/site.php\\n";
        }
    } else {
        echo "Form translations already exist in lang/fr/site.php\\n";
    }
    echo shell_exec('php ' . __DIR__ . '/artisan view:clear');
    `;

    const runCommand = (cmd) => {
        return new Promise((resolve, reject) => {
            conn.exec(cmd, (err, stream) => {
                if (err) return reject(err);
                let out = '';
                stream.on('data', d => out += d.toString());
                stream.stderr.on('data', d => out += 'STDERR: ' + d.toString());
                stream.on('close', () => resolve(out));
            });
        });
    };

    (async () => {
        try {
            console.log('Uploading append script...');
            await runCommand(`cat << 'EOF' > ${basePath}append_lang.php\n${phpScript}\nEOF`);
            
            const out = await runCommand(`php ${basePath}append_lang.php`);
            console.log("OUTPUT:");
            console.log(out);
            
            await runCommand(`rm ${basePath}append_lang.php`);
        } catch (e) {
            console.error('Error:', e);
        } finally {
            console.log('Done.');
            conn.end();
        }
    })();
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
