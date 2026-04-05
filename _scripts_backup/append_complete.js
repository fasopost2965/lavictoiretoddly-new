const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Commands to run
    const phpScript = `<?php
    $langPath = __DIR__.'/lang/fr/site.php';
    if (!file_exists($langPath)) {
        die("lang/fr/site.php not found.");
    }
    
    $content = file_get_contents($langPath);
    
    // Append the full form structure
    $lineToAppend = "
    // Formulaire de Contact COMPLET
    'form_firstname' => 'Prénom',
    'form_firstname_ph' => 'Votre prénom',
    'form_lastname' => 'Nom',
    'form_lastname_ph' => 'Votre nom',
    'form_email_ph' => 'Adresse e-mail',
    'form_phone' => 'Téléphone',
    'form_subject' => 'Sujet de votre demande',
    'form_subject_ph' => 'Sélectionnez un sujet',

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

    'contact_success_title' => 'Message envoyé !',
    'contact_success_desc' => 'Nous vous répondrons sous 24h. Merci pour votre confiance !',
    'contact_error_title' => 'Erreur d\\'envoi',
    'contact_error_desc' => 'Une erreur est survenue lors de l\\'envoi de votre message.',
    'contact_error_hint' => 'Veuillez réessayer plus tard ou nous contacter directement via',
    
    'scroll_top' => 'Retour en haut',
    'lang_switch_full' => 'Français',
";
        
    // Always append, replacing the last ];
    if (preg_match('/\];\s*$/m', $content, $matches, PREG_OFFSET_CAPTURE)) {
        $content = substr($content, 0, $matches[0][1]);
        $content .= $lineToAppend . "\\n];";
        file_put_contents($langPath, $content);
        echo "COMPREHENSIVE FORM TRANSLATIONS INJECTED SUCCESSFULLY.\\n";
    } else {
        echo "Could not find closing bracket in lang/fr/site.php\\n";
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
            console.log('Uploading comprehensive append script...');
            await runCommand(`cat << 'EOF' > ${basePath}append_complete.php\n${phpScript}\nEOF`);
            
            const out = await runCommand(`php ${basePath}append_complete.php`);
            console.log("OUTPUT:");
            console.log(out);
            
            await runCommand(`rm ${basePath}append_complete.php`);
        } catch (e) {
            console.error('Error:', e);
        } finally {
            console.log('Done.');
            conn.end();
        }
    })();
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
