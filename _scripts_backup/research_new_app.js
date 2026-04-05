const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const basePath = 'domains/sore-sports.com/new/';
  // 1. Read .env (MAIL settings)
  conn.exec(`grep "MAIL_" ${basePath}.env`, (err, stream) => {
    if (err) throw err;
    let mailEnv = '';
    stream.on('data', (d) => mailEnv += d.toString());
    stream.on('close', () => {
      console.log('--- NEW MAIL ENV ---');
      console.log(mailEnv);
      
      // 2. Check lang folders
      conn.exec(`ls -F ${basePath}lang/`, (err, stream) => {
        if (err) throw err;
        let langList = '';
        stream.on('data', (d) => langList += d.toString());
        stream.on('close', () => {
          console.log('--- NEW LANG FOLDERS ---');
          console.log(langList);
          
          // 3. Read validation in new if exists
          conn.exec(`ls -F ${basePath}lang/fr/`, (err, stream) => {
             if (err) throw err;
             let frLang = '';
             stream.on('data', d => frLang += d.toString());
             stream.on('close', () => {
                console.log('--- NEW FR LANG FILES ---');
                console.log(frLang);
                
                // 4. Read logs
                conn.exec(`tail -n 20 ${basePath}storage/logs/laravel.log`, (err, stream) => {
                  if (err) throw err;
                  let logs = '';
                  stream.on('data', d => logs += d.toString());
                  stream.on('close', () => {
                    console.log('--- NEW LARAVEL LOGS ---');
                    console.log(logs);
                    conn.end();
                  });
                });
             });
          });
        });
      });
    });
  });
}).on('error', (err) => {
  console.error('Connection error:', err);
}).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
