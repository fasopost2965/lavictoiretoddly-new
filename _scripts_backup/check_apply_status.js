const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const basePath = '/home/u496944919/domains/sore-sports.com/new/';
  conn.exec(`ls -l ${basePath}lang/fr/validation.php && ls -l ${basePath}app/Http/Controllers/ContactController.php && grep "MAIL_PORT" ${basePath}.env`, (err, stream) => {
    if (err) throw err;
    stream.on('data', d => console.log('STATUS: ' + d.toString()));
    stream.on('close', () => conn.end());
  });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
