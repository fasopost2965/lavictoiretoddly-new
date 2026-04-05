const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Command 1: Get tail of laravel.log
    // Command 2: grep for translation keys
    const cmd = `tail -n 100 ${basePath}storage/logs/laravel.log && grep -o "__('site\\.[^']\\+')" ${basePath}resources/views/welcome.blade.php | sort | uniq`;

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
