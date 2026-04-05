const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const basePath = 'domains/sore-sports.com/new/';
  conn.exec(`ls -l ${basePath}app/Mail/ContactFormMail.php`, (err, stream) => {
    if (err) throw err;
    stream.on('data', d => console.log('MAIL CLASS FILE: ' + d.toString()));
    stream.on('close', () => conn.end());
  });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
