const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // List domains/sore-sports.com/
  conn.exec('ls -F domains/sore-sports.com/', (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => console.log('SORE_SPORTS_ROOT: ' + d.toString()));
    stream.on('close', () => {
      conn.end();
    });
  });
}).on('error', (err) => {
  console.error('Connection error:', err);
}).connect({
  host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050'
});
