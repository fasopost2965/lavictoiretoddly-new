const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Commands to run
    const cmd = `
        cd ${basePath}
        
        # Ensure we delete the mistaken resources/lang override
        rm -rf resources/lang/fr/site.php || true
        rmdir resources/lang/fr || true
        rmdir resources/lang || true
        
        # Display the actual original file
        echo "=== ORIGINAL LANG/FR/SITE.PHP HEAD ==="
        head -n 20 lang/fr/site.php
        
        # Clear cache to immediately bring back original translations
        php artisan view:clear
        php artisan cache:clear
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.stderr.on('data', d => dataStr += d.toString());
        stream.on('close', () => {
             console.log("RESTORE OUTPUT:\n" + dataStr);
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
