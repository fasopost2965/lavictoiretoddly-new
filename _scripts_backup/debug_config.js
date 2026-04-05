const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Commands to run
    // 1. Get latest error in log
    // 2. Get mail config from .env
    // 3. Extract exact site.form translation keys from welcome.blade.php
    const cmd = `
        echo "--- LATEST LOG ERROR ---"
        tail -n 20 ${basePath}storage/logs/laravel.log
        echo "--- MAIL CONFIG ---"
        grep "^MAIL_" ${basePath}.env
        echo "--- TRANSLATION KEYS ---"
        grep -o "__('site\\.[^']\\+')" ${basePath}resources/views/welcome.blade.php | sort | uniq
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.on('close', () => {
             console.log(dataStr);
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
