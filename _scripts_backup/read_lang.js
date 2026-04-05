const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read validation languages
  conn.exec('ls -R domains/sore-sports.com/public_html/resources/lang/', (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => console.log('LANG FILES: ' + d.toString()));
    stream.on('close', () => {
      conn.exec('cat domains/sore-sports.com/public_html/resources/lang/fr/validation.php', (err, stream) => {
        if (err) throw err;
        let fr = '';
        stream.on('data', (d) => fr += d.toString());
        stream.on('close', () => {
          console.log('--- FR VALIDATION ---');
          console.log(fr);
          conn.exec('cat domains/sore-sports.com/public_html/resources/lang/en/validation.php', (err, stream) => {
            if (err) throw err;
            let en = '';
            stream.on('data', (d) => en += d.toString());
            stream.on('close', () => {
              console.log('--- EN VALIDATION ---');
              console.log(en);
              conn.end();
            });
          });
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
