const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Check if git is available to restore site.php
    // Check if lang/en/site.php exists
    const cmd = `
        cd ${basePath}
        if [ -d .git ]; then
            echo "GIT REPO DETECTED"
            git status | head -n 10
            git diff resources/lang/fr/site.php | head -n 20
        else
            echo "NO GIT REPO"
        fi
        
        echo "=== CHECKING EN DIR ==="
        ls -la resources/lang/en/site.php || true
        cat resources/lang/en/site.php || true
        
        echo "=== CHECKING OTHER ZIP/BACKUPS ==="
        ls -la /home/u496944919/domains/sore-sports.com/ | grep -i zip
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.stderr.on('data', d => dataStr += d.toString());
        stream.on('close', () => {
             console.log(dataStr);
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
