const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('--- CONNECTÉ ---');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    sftp.readdir('.', (err, list) => {
      if (err) throw err;
      console.log('STRUCTURE DES DOSSIERS :');
      console.log(JSON.stringify(list.map(f => f.filename + (f.attrs.isDirectory() ? '/' : '')), null, 2));
      conn.end();
    });
  });
}).on('error', (err) => {
  console.error('ERREUR SSH :', err.message);
  if (err.level === 'client-authentication') {
    console.error('ÉCHEC AUTHENTIFICATION : Mot de passe refusé.');
  }
}).connect({
  host: '145.223.106.125',
  port: 65002,
  username: 'u496944919',
  password: 'Prodesk@2025'
});
