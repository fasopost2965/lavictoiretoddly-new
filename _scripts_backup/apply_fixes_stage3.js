const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';

    // Local files created in previous steps
    const siteContent = fs.readFileSync('local_site.php', 'utf8');
    const ctrlContent = fs.readFileSync('local_ContactController.php', 'utf8');

    const runCommand = (cmd) => {
        return new Promise((resolve, reject) => {
            conn.exec(cmd, (err, stream) => {
                if (err) return reject(err);
                let out = '';
                stream.on('data', d => out += d.toString());
                stream.stderr.on('data', d => console.error(d.toString()));
                stream.on('close', () => resolve(out));
            });
        });
    };

    (async () => {
        try {
            console.log('Creating lang/fr directory...');
            await runCommand(`mkdir -p ${basePath}resources/lang/fr`);

            console.log('Writing site.php...');
            await runCommand(`cat << 'EOF' > ${basePath}resources/lang/fr/site.php\n${siteContent}\nEOF`);
            
            console.log('Writing ContactController.php (removing min length)...');
            await runCommand(`cat << 'EOF' > ${basePath}app/Http/Controllers/ContactController.php\n${ctrlContent}\nEOF`);
            
            console.log('Updating .env...');
            // In Laravel 9+, SMTP with port 587 should use MAIL_ENCRYPTION=tls
            // Or if that fails, simply remove "ssl" and replace it with "tls" across the env file.
            await runCommand(`sed -i 's/MAIL_ENCRYPTION=ssl/MAIL_ENCRYPTION=tls/g' ${basePath}.env`);
            await runCommand(`sed -i 's/MAIL_ENCRYPTION=smtps/MAIL_ENCRYPTION=tls/g' ${basePath}.env`);
            
            console.log('Clearing Laravel Caches...');
            let cf1 = await runCommand(`php ${basePath}artisan config:clear`);
            console.log(cf1);
            let cf2 = await runCommand(`php ${basePath}artisan cache:clear`);
            console.log(cf2);
            let cf3 = await runCommand(`php ${basePath}artisan view:clear`);
            console.log(cf3);
            
            console.log('Fixes applied successfully to public_html and caches cleared!');
        } catch (e) {
            console.error('Error:', e);
        } finally {
            conn.end();
        }
    })();
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
