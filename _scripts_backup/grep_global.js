const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Global grep for Victoire inside domains/
  conn.exec('grep -r "Victoire" domains/ | head -n 5', (err, stream) => {
    if (err) throw err;
    stream.on('data', (data) => {
      console.log('GREP GLOBAL: ' + data.toString());
    }).on('close', () => {
      conn.end();
    });
  });
}).on('error', (err) => {
  console.error('Connection error:', err);
}).connect({
  host: '145.223.106.125',
  port: 65002,
  username: 'u496944919',
  password: 'Prodesk@2050'
});
