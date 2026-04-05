const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read fr validation
  conn.exec('cat domains/sore-sports.com/public_html/lang/fr/validation.php', (err, stream) => {
    if (err) throw err;
    let fr = '';
    stream.on('data', (d) => fr += d.toString());
    stream.on('close', () => {
      console.log('--- ROOT FR VALIDATION ---');
      console.log(fr);
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
