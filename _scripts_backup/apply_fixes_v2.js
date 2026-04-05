const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    // ABSOLUTE PATH
    const basePath = '/home/u496944919/domains/sore-sports.com/new/';

    // 1. Validation.php
    const valContent = fs.readFileSync('local_validation.php', 'utf8');
    // 2. ContactController.php
    const ctrlContent = fs.readFileSync('local_ContactController.php', 'utf8');

    const runCommand = (cmd) => {
        return new Promise((resolve, reject) => {
            conn.exec(cmd, (err, stream) => {
                if (err) return reject(err);
                stream.on('close', resolve).on('data', d => console.log(d.toString())).stderr.on('data', d => console.error(d.toString()));
            });
        });
    };

    (async () => {
        try {
            // Ensure directories exist
            console.log('Ensuring directories exist...');
            await runCommand(`mkdir -p ${basePath}resources/lang/fr`);

            console.log('Applying validation.php...');
            await runCommand(`cat << 'EOF' > ${basePath}resources/lang/fr/validation.php\n${valContent}\nEOF`);
            
            console.log('Applying ContactController.php...');
            await runCommand(`cat << 'EOF' > ${basePath}app/Http/Controllers/ContactController.php\n${ctrlContent}\nEOF`);
            
            console.log('Updating .env...');
            await runCommand(`sed -i 's/MAIL_PORT=465/MAIL_PORT=587/g' ${basePath}.env && sed -i 's/MAIL_ENCRYPTION=ssl/MAIL_ENCRYPTION=tls/g' ${basePath}.env`);
            
            console.log('All fixes applied successfully!');
        } catch (e) {
            console.error('Error during execution:', e);
        } finally {
            conn.end();
        }
    })();
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
