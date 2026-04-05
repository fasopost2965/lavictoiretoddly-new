const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    conn.exec(`grep -E "__\\('site\\.form_[a-zA-Z_]+\\'\\)" ${basePath}resources/views/welcome.blade.php && tail -n 50 ${basePath}storage/logs/laravel.log`, (err, stream) => {
        if (err) throw err;
        stream.on('data', d => console.log('DATA:\n' + d.toString()));
        stream.on('stderr', d => console.error('ERR:\n' + d.toString()));
        stream.on('close', () => conn.end());
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
