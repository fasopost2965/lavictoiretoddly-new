const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    const phpScript = `<?php
    require __DIR__.'/vendor/autoload.php';
    \\$app = require_once __DIR__.'/bootstrap/app.php';
    \\$kernel = \\$app->make(Illuminate\\Contracts\\Console\\Kernel::class);
    \\$kernel->bootstrap();

    try {
        Illuminate\\Support\\Facades\\Mail::raw('Diagnostic Test', function (\\$message) {
            \\$message->to('fsore701@outlook.com')->subject('Diagnostic');
        });
        echo "SUCCESS: Email sent successfully.\\n";
    } catch (\\Exception \\$e) {
        echo "ERROR_MESSAGE: " . \\$e->getMessage() . "\\n";
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
            await runCommand(`cat << 'EOF' > ${basePath}test_mail.php\n${phpScript}\nEOF`);
            const out = await runCommand(`php ${basePath}test_mail.php`);
            console.log(out);
            await runCommand(`rm ${basePath}test_mail.php`);
        } catch (e) {
            console.error('Error:', e);
        } finally {
            conn.end();
        }
    })();
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
