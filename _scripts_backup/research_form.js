const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read welcome.blade.php to find the form
  conn.exec('cat domains/sore-sports.com/public_html/resources/views/welcome.blade.php', (err, stream) => {
    if (err) throw err;
    let content = '';
    stream.on('data', (data) => {
      content += data.toString();
    }).on('close', () => {
      console.log('--- WELCOME CONTENT ---');
      console.log(content);
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
