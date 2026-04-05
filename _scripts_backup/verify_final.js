const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    // Run tinker to check translation and config
    const tinkerCmd = `php ${basePath}artisan tinker --execute="echo 'VALIDATION: ' . __('validation.min.string', ['attribute' => 'message', 'min' => 10]) . PHP_EOL; echo 'MAIL_PORT: ' . config('mail.mailers.smtp.port') . PHP_EOL; echo 'MAIL_ENCRYPTION: ' . config('mail.mailers.smtp.encryption') . PHP_EOL;"`;
    
    conn.exec(tinkerCmd, (err, stream) => {
        if (err) throw err;
        stream.on('data', d => console.log(d.toString()));
        stream.on('close', () => conn.end());
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
