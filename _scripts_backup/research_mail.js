const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read .env but obfuscate secrets if logging? No, I need them to verify.
  // I'll cat .env carefully.
  conn.exec('grep "MAIL_" domains/sore-sports.com/public_html/.env', (err, stream) => {
    if (err) throw err;
    let env = '';
    stream.on('data', (d) => env += d.toString());
    stream.on('close', () => {
      console.log('--- MAIL ENV ---');
      console.log(env);
      // Read ContactFormMail
      conn.exec('cat domains/sore-sports.com/public_html/app/Mail/ContactFormMail.php', (err, stream) => {
        if (err) throw err;
        let mailClass = '';
        stream.on('data', (d) => mailClass += d.toString());
        stream.on('close', () => {
          console.log('--- MAIL CLASS ---');
          console.log(mailClass);
          // Check last log
          conn.exec('tail -n 50 domains/sore-sports.com/public_html/storage/logs/laravel.log', (err, stream) => {
            if (err) throw err;
            let logs = '';
            stream.on('data', (d) => logs += d.toString());
            stream.on('close', () => {
              console.log('--- LARAVEL LOGS ---');
              console.log(logs);
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
