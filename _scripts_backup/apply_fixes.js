const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const basePath = '/home/u496944919/domains/sore-sports.com/new/';
  
  conn.sftp((err, sftp) => {
    if (err) throw err;
    
    // 1. Upload validation.php
    console.log('Uploading validation.php...');
    const valContent = fs.readFileSync('local_validation.php', 'utf8');
    sftp.writeFile(basePath + 'lang/fr/validation.php', valContent, (err) => {
      if (err) throw err;
      console.log('Validation file written.');
      
      // 2. Upload ContactController.php
      console.log('Uploading ContactController.php...');
      const ctrlContent = fs.readFileSync('local_ContactController.php', 'utf8');
      sftp.writeFile(basePath + 'app/Http/Controllers/ContactController.php', ctrlContent, (err) => {
        if (err) throw err;
        console.log('ContactController written.');
        
        // 3. Update .env
        console.log('Updating .env...');
        conn.exec(`sed -i 's/MAIL_PORT=465/MAIL_PORT=587/g' ${basePath}.env && sed -i 's/MAIL_ENCRYPTION=ssl/MAIL_ENCRYPTION=tls/g' ${basePath}.env`, (err, stream) => {
          if (err) throw err;
          stream.on('close', () => {
            console.log('.env updated.');
            conn.end();
          });
        });
      });
    });
  });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
