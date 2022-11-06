const fs = require('node:fs');
const fsPromise =  require('node:fs/promises');
const path = require('node:path');
const readline = require('node:readline');


fsPromise.mkdir(path.join(__dirname,'project-dist'),{recursive:true});

const readHtml = fs.createReadStream(path.join(__dirname,'template.html'),'utf-8');
const writeStream = fs.createWriteStream(path.join(__dirname,'project-dist','index.html'),'utf-8')

let rl;
let compIterator = 0;

let components = {};
fs.readdir(path.join(__dirname,'components'), async (err,files)=>{
	files.forEach((file)=>{
	const RSForThisFile = fs.createReadStream(path.join(__dirname,'components',file),'utf-8');
	RSForThisFile.on('data',(data)=> {
		const ext = path.extname(file);
		components[(path.basename(file,ext))] = data;
		compIterator++;
		if(compIterator === files.length){
			rl = readline.createInterface(readHtml,writeStream);

			rl.on('line', (input)=>{
				if(input.includes('{{')){
					writeStream.write(components[input.trim().substring(2,input.trim().length-2)]+'\n')
				}else{
					writeStream.write(input+'\n')
				}
				})
		} 
		})
	})		
});

const cssBundleSream = fs.createWriteStream(path.join(__dirname,'project-dist','style.css'),'utf-8');

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

const assetsBundle = path.join(__dirname,'project-dist','assets');

fsPromise.mkdir(assetsBundle, {recursive:true});

fsPromise.readdir(path.join(__dirname,'assets'),{withFileTypes:true}).then(files=>{
	files.forEach(file =>{
		if(file.isDirectory()){
			const thisDirectory = path.join(assetsBundle,file.name)
			fsPromise.mkdir(thisDirectory, {recursive:true});
			fsPromise.readdir(path.join(__dirname,'assets',file.name)).then(files2=>{
				files2.forEach(file2 =>{
					fs.copyFile(path.join(__dirname,'assets',file.name, file2), path.join(thisDirectory,file2), ()=>{
					});
				})
			})
		}
	})
})


