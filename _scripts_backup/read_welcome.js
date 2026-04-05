const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read the welcome file
  conn.exec('head -n 20 domains/sore-sports.com/public_html/resources/views/welcome.blade.php', (err, stream) => {
    if (err) throw err;
    stream.on('data', (data) => {
      console.log('FILE CONTENT: ' + data.toString());
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
