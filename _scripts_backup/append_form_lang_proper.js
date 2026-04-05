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
    
    // Check if form_opt_friendly is already in there
    if (strpos($content, "'form_opt_friendly'") === false) {
        $lineToAppend = "
    // Formulaire de Contact Options Dropdown Manquantes
    'form_opt_friendly' => 'Organisation de matchs amicaux',
    'form_opt_fifa' => 'Journées FIFA',
    'form_opt_camp' => 'Camp d\\'entraînement',
    'form_opt_logistics' => 'Logistique & accompagnement',
    'form_opt_contract' => 'Négociation contractuelle',
    'form_opt_event' => 'Événement sportif',
    'form_opt_marketing' => 'Marketing sportif',
    'form_opt_other' => 'Autre demande',

    // Notifications
    'contact_success_title' => 'Message envoyé!',
    'contact_success_desc' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
    'contact_error_title' => 'Erreur d\\'envoi',
    'contact_error_desc' => 'Une erreur est survenue lors de l\\'envoi de votre message.',
    'contact_error_hint' => 'Veuillez réessayer plus tard ou nous contacter directement via',
    
    'scroll_top' => 'Retour en haut',
    'lang_switch_full' => 'Français',
";
        
        // Remove the last ]; from the original file
        if (preg_match('/\];\s*$/m', $content, $matches, PREG_OFFSET_CAPTURE)) {
            $content = substr($content, 0, $matches[0][1]);
            $content .= $lineToAppend . "\\n];";
            file_put_contents($langPath, $content);
            echo "Missing form dropdown and notification translations injected successfully.\\n";
        } else {
            echo "Could not find closing bracket in lang/fr/site.php\\n";
        }
    } else {
        echo "Dropdown translations already exist in lang/fr/site.php\\n";
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
            console.log('Uploading proper append script...');
            await runCommand(`cat << 'EOF' > ${basePath}append_lang_proper.php\n${phpScript}\nEOF`);
            
            const out = await runCommand(`php ${basePath}append_lang_proper.php`);
            console.log("OUTPUT:");
            console.log(out);
            
            await runCommand(`rm ${basePath}append_lang_proper.php`);
        } catch (e) {
            console.error('Error:', e);
        } finally {
            console.log('Done.');
            conn.end();
        }
    })();
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
