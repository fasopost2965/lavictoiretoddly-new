const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Commands to run
    const cmd = `
        cd ${basePath}
        git config user.name "AI Assistant"
        git config user.email "bot@sore-sports.com"
        git add app/Http/Controllers/ContactController.php
        git add lang/fr/site.php
        git commit -m "Fix contact form validation and completely translate all labels"
        echo "=== PUSH OUTPUT ==="
        # We use a timeout to prevent it from hanging infinitely waiting for password
        timeout 10 git push origin main 2>&1
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.stderr.on('data', d => dataStr += d.toString());
        stream.on('close', () => {
             console.log("GIT PUSH DIAGNOSTIC:\n" + dataStr);
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
