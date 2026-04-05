const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // List public_html
  conn.exec('ls -F domains/sore-sports.com/public_html/', (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => console.log('PUBLIC_HTML: ' + d.toString()));
    stream.on('close', () => {
      conn.end();
    });
  });
}).on('error', (err) => {
  console.error('Connection error:', err);
}).connect({
  host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050'
});
