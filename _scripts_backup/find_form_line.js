const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read welcome.blade.php but grep for form to find the line numbers or just read a chunk
  conn.exec('grep -n "<form" domains/sore-sports.com/public_html/resources/views/welcome.blade.php', (err, stream) => {
    if (err) throw err;
    stream.on('data', (data) => {
      console.log('FORM TAGS: ' + data.toString());
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
