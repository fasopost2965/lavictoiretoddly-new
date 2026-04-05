const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Read form fields
  conn.exec('sed -n "861,950p" domains/sore-sports.com/public_html/resources/views/welcome.blade.php', (err, stream) => {
    if (err) throw err;
    let form = '';
    stream.on('data', (d) => form += d.toString());
    stream.on('close', () => {
      console.log('--- FORM CONTENT ---');
      console.log(form);
      // Read routes
      conn.exec('cat domains/sore-sports.com/public_html/routes/web.php', (err, stream) => {
        if (err) throw err;
        let routes = '';
        stream.on('data', (d) => routes += d.toString());
        stream.on('close', () => {
          console.log('--- ROUTES CONTENT ---');
          console.log(routes);
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
