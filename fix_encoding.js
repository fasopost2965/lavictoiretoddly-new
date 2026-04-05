const fs = require('fs');
const path = require('path');

const byteReplacements = [
    // Double-encoded UTF-8 from UTF-8
    { m: [0xC3, 0x83, 0xE2, 0x80, 0xB0], c: 'É' }, // Ã‰ (with UTF8 per mille)
    { m: [0xC3, 0x83, 0xE2, 0x82, 0xAC], c: 'À' }, // Ã€ (with UTF8 Euro/etc)
    { m: [0xE2, 0x80, 0x94], c: '—' },
    { m: [0xE2, 0x80, 0x93], c: '–' },
    { m: [0xE2, 0x80, 0x99], c: "'" },
    { m: [0xE2, 0x80, 0xA6], c: '...' },

    // Double-encoded UTF-8 from Windows-1252/Latin1
    { m: [0xC3, 0x83, 0xC2, 0x89], c: 'É' }, // Ã‰ (with Latin1 0x89)
    { m: [0xC3, 0x83, 0xC2, 0xA9], c: 'é' }, // Ã©
    { m: [0xC3, 0x83, 0xC2, 0xA0], c: 'à' }, // Ã 
    { m: [0xC3, 0x83, 0xC2, 0x80], c: 'À' }, // Ã€ (with Latin1 0x80)
    { m: [0xC3, 0x83, 0xC2, 0xA8], c: 'è' }, // Ã¨
    { m: [0xC3, 0x83, 0xC2, 0xAA], c: 'ê' }, // Ãª
    { m: [0xC3, 0x83, 0xC2, 0xB4], c: 'ô' }, // Ã´
    { m: [0xC3, 0x83, 0xC2, 0xBB], c: 'û' }, // Ã»
    { m: [0xC3, 0x83, 0xC2, 0xAE], c: 'î' }, // Ã®
    { m: [0xC3, 0x83, 0xC2, 0xA7], c: 'ç' }, // Ã§
    { m: [0xC3, 0x83, 0xC2, 0xB9], c: 'ù' }, // Ã¹
    { m: [0xC3, 0x83, 0xC2, 0x8A], c: 'Ê' }, // ÃŠ
    { m: [0xC3, 0x83, 0x20], c: 'à ' },
    { m: [0xC3, 0x83, 0xC2, 0xAF], c: 'ï' },
    { m: [0xC3, 0x83, 0xC2, 0xAB], c: 'ë' }
];

const stringReplacements = [
    { f: 'Ã‰', t: 'É' },
    { f: 'Ã©', t: 'é' },
    { f: 'Ã ', t: 'à' },
    { f: 'Ã€', t: 'À' },
    { f: 'Ã¨', t: 'è' },
    { f: 'Ãª', t: 'ê' },
    { f: 'Ã´', t: 'ô' },
    { f: 'Ã»', t: 'û' },
    { f: 'Ã®', t: 'î' },
    { f: 'Ã§', t: 'ç' },
    { f: 'Ã¹', t: 'ù' },
    { f: 'Â·', t: '·' },
    { f: 'Â©', t: '©' },
    { f: 'Â', t: '' }
];

function replaceInBuffer(buffer, mangled, correct) {
    const mangledBuf = Buffer.from(mangled);
    const correctBuf = Buffer.from(correct, 'utf8');
    let parts = [];
    let start = 0;
    let idx;
    while ((idx = buffer.indexOf(mangledBuf, start)) !== -1) {
        parts.push(buffer.slice(start, idx));
        parts.push(correctBuf);
        start = idx + mangledBuf.length;
    }
    if (parts.length === 0) return buffer;
    parts.push(buffer.slice(start));
    return Buffer.concat(parts);
}

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            if (f !== 'node_modules' && f !== '.git' && f !== '_scripts_backup') walk(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

walk(process.cwd(), (filePath) => {
    if (filePath.endsWith('.html')) {
        let buffer = fs.readFileSync(filePath);
        let originalBuffer = buffer;

        byteReplacements.forEach(r => {
            buffer = replaceInBuffer(buffer, r.m, r.c);
        });

        let content = buffer.toString('utf8');
        let originalContent = content;
        stringReplacements.forEach(r => {
            if (r.f && r.t !== undefined) {
                content = content.split(r.f).join(r.t);
            }
        });

        if (content !== originalContent || !buffer.equals(originalBuffer)) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed: ${filePath}`);
        }
    }
});
