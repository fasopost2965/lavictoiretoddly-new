const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Commands to run
    const cmd = `
        cd ${basePath}
        echo "=== TINKER TRANSLATION TEST ==="
        php artisan tinker --execute="echo __('site.meta_title'); echo '\\n';"
        php artisan tinker --execute="echo __('site.form_firstname'); echo '\\n';"
        
        echo "=== CURL INDEX ==="
        curl -s https://sore-sports.com | grep -o "site\\.[a-zA-Z_]\\+" | head -n 10
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.stderr.on('data', d => dataStr += d.toString());
        stream.on('close', () => {
             console.log("DIAGNOSTIC:\n" + dataStr);
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
