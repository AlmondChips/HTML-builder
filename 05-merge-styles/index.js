const fs = require('node:fs');
const fsPromise =  require('node:fs/promises');
const path = require('node:path');

const cssBundleSream = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'),'utf-8');

fsPromise.readdir(path.join(__dirname,'styles'),{withFileTypes:true}).then((files)=>{
	files.forEach((file)=>{
		if(path.extname(file.name) === '.css'){
			const readStream = fs.createReadStream(path.join(__dirname,'styles',file.name),'utf-8');
			readStream.pipe(cssBundleSream);
			readStream.once('data',()=>{
				cssBundleSream.write('\n');
			})
		}
	})

})
