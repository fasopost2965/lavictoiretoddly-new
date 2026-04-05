const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // First, find inside domains/
  conn.exec('find domains/ -maxdepth 10 -name "welcome.blade.php" -o -name "welcome.php"', (err, stream) => {
    if (err) throw err;
    stream.on('data', (data) => {
      console.log('FIND OUTPUT: ' + data.toString());
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
