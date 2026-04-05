const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Commands to run
    const cmd = `
        cd ${basePath}
        echo "=== GIT LS FILES ==="
        git ls-files | grep -i lang
        
        echo "=== CHECKING RESOURCES/LANG FR/SITE.PHP ==="
        cat resources/lang/fr/site.php || true
        
        echo "=== ALL KEYS IN WELCOME.BLADE.PHP ==="
        grep -o "__('site\\.[^']\\+')" resources/views/welcome.blade.php | sort | uniq
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
