const fs = require('node:fs');
const path = require('node:path');
const readable = require('node:stream');
const os = require('node:os');

const stream = fs.createReadStream(path.join(__dirname, './text.txt'), 'utf-8');

stream.on('data', (chunk)=>{
console.log(chunk);
});

stream.on('end', ()=>{stream.close()});
