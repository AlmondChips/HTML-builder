const fs = require('node:fs');
const path = require('node:path');
const readable = require('node:stream');

const stream = fs.createReadStream(path.join(__dirname, './text.txt'));

stream.on('readable', () => {
  console.log(`${stream.read()}`);
	stream.close();
});

