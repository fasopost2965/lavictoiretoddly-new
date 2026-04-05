const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // PHP script to test SMTP connection explicitly returning output
    const phpScript = `<?php
    $envPath = __DIR__.'/.env';
    echo shell_exec('php ' . __DIR__ . '/artisan config:clear');
    
    require __DIR__.'/vendor/autoload.php';
    $app = require_once __DIR__.'/bootstrap/app.php';
    $kernel = $app->make(Illuminate\\Contracts\\Console\\Kernel::class);
    $kernel->bootstrap();

    try {
        Illuminate\\Support\\Facades\\Mail::raw('Test Hostinger config retry.', function ($message) {
            $message->to('fsore701@outlook.com')->subject('Diagnostic Hostinger Configuration Retry');
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
            console.log('Uploading explicit test script...');
            await runCommand(`cat << 'EOF' > ${basePath}explicit_test.php\n${phpScript}\nEOF`);
            
            console.log('Executing explicit script...');
            const out = await runCommand(`php ${basePath}explicit_test.php`);
            console.log("OUTPUT:");
            console.log(out);
            
            console.log('Cleaning up...');
            await runCommand(`rm ${basePath}explicit_test.php`);
        } catch (e) {
            console.error('Error:', e);
        } finally {
            console.log('Done.');
            conn.end();
        }
    })();
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
