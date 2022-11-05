const { dir } = require('node:console');
const { stat } = require('node:fs');
const fs = require('node:fs/promises');
const path = require('node:path');


const dirInfo = fs.readdir(path.resolve(__dirname,'./secret-folder'),{withFileTypes:true})

dirInfo.then((data)=>{
	data.forEach(element => {
		 if(!element.isDirectory()){
			 const fullName = element.name;
			 let ext = path.extname(fullName);
			 let fileName = path.basename(fullName, ext);
			 fs.stat(path.join(__dirname,'/secret-folder/', fullName)).then((stats)=>{
				console.log(`${fileName} - ${ext.substring(1)} - ${(stats.size/1024).toFixed(3)}kb`);
					})

		}
	})
});
