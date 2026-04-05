const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read ContactController
  conn.exec('cat domains/sore-sports.com/public_html/app/Http/Controllers/ContactController.php', (err, stream) => {
    if (err) throw err;
    let controller = '';
    stream.on('data', (d) => controller += d.toString());
    stream.on('close', () => {
      console.log('--- CONTROLLER CONTENT ---');
      console.log(controller);
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
