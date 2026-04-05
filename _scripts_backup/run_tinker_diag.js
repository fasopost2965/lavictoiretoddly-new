const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Commands to run
    // Fetch the select element for subject from welcome.blade.php
    const cmd = `
        php ${basePath}artisan tinker --execute="
            try {
                \\Illuminate\\Support\\Facades\\Mail::raw('Diagnostic Test', function (\\$message) {
                    \\$message->to('fsore701@outlook.com')->subject('Diagnostic');
                });
                echo '===DIAGNOSTIC_SUCCESS===';
            } catch (\\Exception \\$e) {
                echo '===DIAGNOSTIC_ERROR===|' . \\$e->getMessage();
            }
        "
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.stderr.on('data', d => dataStr += d.toString());
        stream.on('close', () => {
             console.log("DIAGNOSTIC OUTPUT:\n" + dataStr);
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
