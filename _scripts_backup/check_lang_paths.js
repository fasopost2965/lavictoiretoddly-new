const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Check root lang directory
  conn.exec('ls -F domains/sore-sports.com/public_html/lang/', (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => console.log('ROOT LANG: ' + d.toString()));
    stream.on('close', () => {
      // Also check resources/lang again
      conn.exec('ls -F domains/sore-sports.com/public_html/resources/lang/', (err, stream) => {
        if (err) throw err;
        stream.on('data', (d) => console.log('RESOURCES LANG: ' + d.toString()));
        stream.on('close', () => {
          conn.end();
        });
      });
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
