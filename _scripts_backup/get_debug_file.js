const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    const cmd = `
        echo "=== LOG ERROR ==="
        tail -n 10 ${basePath}storage/logs/laravel.log
        echo "=== ENV MAIL ==="
        grep "^MAIL_" ${basePath}.env
        echo "=== KEYS ==="
        grep -E "__\\('site\\.form_[^']+'\\)" -o ${basePath}resources/views/welcome.blade.php | sort | uniq
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.on('close', () => {
             fs.writeFileSync('debug_output.txt', dataStr);
             console.log("Output saved to debug_output.txt");
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
