const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    sftp.readdir('.', (err, list) => {
      if (err) throw err;
      console.log('SFTP ROOT LIST: ' + JSON.stringify(list.map(f => f.filename)));
      conn.end();
    });
  });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
