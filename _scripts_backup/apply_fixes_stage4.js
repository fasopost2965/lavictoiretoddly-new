const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // Read the newly created locale file
    const siteContent = fs.readFileSync('local_site.php', 'utf8');

    // Remove `MAIL_SCHEME=ssl` and replace with `MAIL_ENCRYPTION=tls`
    // Overwrite the site.php file with the correct translation keys
    // Clear Laravel caches
    const cmd = `
        cat << 'EOF' > ${basePath}resources/lang/fr/site.php
${siteContent}
EOF
        
        sed -i 's/^MAIL_SCHEME=ssl/MAIL_ENCRYPTION=tls/g' ${basePath}.env
        sed -i 's/^MAIL_ENCRYPTION=ssl/MAIL_ENCRYPTION=tls/g' ${basePath}.env
        
        php ${basePath}artisan config:clear
        php ${basePath}artisan cache:clear
        php ${basePath}artisan view:clear
        
        echo "FIXES HAVE BEEN APPLIED."
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.on('close', () => {
             console.log(dataStr);
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
