const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const basePath = '/home/u496944919/domains/sore-sports.com/public_html/';
    
    // We will use Tinker to execute the mail send synchronously and capture the verbose exception
    const tinkerCmd = `
php ${basePath}artisan tinker --execute="
try {
    Illuminate\\Support\\Facades\\Mail::raw('Test email from Sore Sports diagnostic script.', function (\\Illuminate\\Mail\\Message $message) {
        $message->to('fsore701@outlook.com')->subject('Diagnostic Test');
    });
    echo 'SUCCESS: Email sent successfully.';
} catch (\\Exception \\$e) {
    echo 'ERROR_CLASS: ' . get_class(\\$e) . PHP_EOL;
    echo 'ERROR_MESSAGE: ' . \\$e->getMessage() . PHP_EOL;
    echo 'ERROR_TRACE: ' . \\$e->getTraceAsString();
}
"`;

    conn.exec(tinkerCmd, (err, stream) => {
        if (err) throw err;
        let dataStr = '';
        stream.on('data', d => dataStr += d.toString());
        stream.stderr.on('data', d => dataStr += 'STDERR: ' + d.toString());
        stream.on('close', () => {
             console.log(dataStr);
             conn.end();
        });
    });
}).on('error', (err) => console.error(err)).connect({ host: '145.223.106.125', port: 65002, username: 'u496944919', password: 'Prodesk@2050' });
