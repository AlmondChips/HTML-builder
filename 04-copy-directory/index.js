const fs = require('node:fs/promises');
const path = require('node:path');

function copyDir(){
	const copyPath = path.join(__dirname, 'files-copy');
	fs.rm(copyPath, {recursive:true}).then(()=>{
		actualCopy();
	}).catch((reason) =>{
		actualCopy();
	});

	function actualCopy(){
		fs.mkdir(copyPath, {recursive:true});
		fs.readdir(path.join(__dirname,'files')).then((files)=>{
			files.forEach((file)=>{
				fs.copyFile(path.join(__dirname,'files',file),path.join(copyPath,file));
			})
		})
	}
}

copyDir();
