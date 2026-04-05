const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // PHP script to cleanly update .env and run a test email
    const phpScript = `<?php
    $envPath = __DIR__.'/.env';
    $envContent = file_get_contents($envPath);

    $replacements = [
        'MAIL_MAILER' => 'smtp',
        'MAIL_HOST' => 'smtp.titan.email',
        'MAIL_PORT' => '587',
        'MAIL_USERNAME' => 'contact@sore-sports.com',
        'MAIL_PASSWORD' => 'Sore93abdoul@',
        'MAIL_ENCRYPTION' => 'tls',
        'MAIL_FROM_ADDRESS' => 'contact@sore-sports.com',
        'MAIL_FROM_NAME' => '"Sore Sports Contact"',
    ];

    foreach ($replacements as $key => $value) {
        $pattern = "/^" . $key . "=.*$/m";
        if (preg_match($pattern, $envContent)) {
            $envContent = preg_replace($pattern, $key . '=' . $value, $envContent);
        } else {
            $envContent .= "\\n" . $key . '=' . $value;
        }
    }
    
    // Also remove MAIL_SCHEME if it exists so it doesn't conflict
    $envContent = preg_replace("/^MAIL_SCHEME=.*$\\n?/m", "", $envContent);

    file_put_contents($envPath, $envContent);

    echo "ENV Updated.\\n";

    // Call artisan commands directly via shell_exec to be clean
    echo shell_exec('php ' . __DIR__ . '/artisan config:clear');
    echo shell_exec('php ' . __DIR__ . '/artisan cache:clear');

    // Run custom test email script
    require __DIR__.'/vendor/autoload.php';
    $app = require_once __DIR__.'/bootstrap/app.php';
    $kernel = $app->make(Illuminate\\Contracts\\Console\\Kernel::class);
    $kernel->bootstrap();

    try {
        Illuminate\\Support\\Facades\\Mail::raw('Ceci est un test de diagnostic direct du serveur avec la nouvelle configuration Titan Mail.', function ($message) {
            $message->to('fsore701@outlook.com')->subject('Diagnostic Test Configuration Titan');
        });
        echo "===DIAGNOSTIC_SUCCESS=== Email envoyé avec succès !\\n";
    } catch (\\Exception $e) {
        echo "===DIAGNOSTIC_ERROR=== " . $e->getMessage() . "\\n";
    }
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
            console.log('Uploading update script...');
            await runCommand(`cat << 'EOF' > ${basePath}update_test.php\n${phpScript}\nEOF`);
            
            console.log('Executing update script...');
            const out = await runCommand(`php ${basePath}update_test.php`);
            console.log("OUTPUT:");
            console.log(out);
            
            console.log('Cleaning up...');
            await runCommand(`rm ${basePath}update_test.php`);
        } catch (e) {
            console.error('Error:', e);
        } finally {
            console.log('Done.');
            conn.end();
        }
    })();
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
