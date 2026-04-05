const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read where public_html points to
  conn.exec('readlink -f public_html', (err, stream) => {
    if (err) throw err;
    stream.on('data', (data) => {
      console.log('PUBLIC_HTML LINK: ' + data.toString());
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
