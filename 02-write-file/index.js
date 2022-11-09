const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');
const { stdin: input, stdout: output } = require('node:process');
const process = require('node:process');


const rl = readline.createInterface({ input, output });
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

  rl.question("What would you like to write?\n", (answer) => {
		if(answer === 'exit'){
			rl.close();
			return;
		} 
    writeStream.write(answer+'\n', ()=>{	
      rl.setPrompt('Anything else? (press Ctrl+C or write "exit" to stop.)\n');
      rl.prompt();
      rl.on('line', (input) => {
          if(input === 'exit'){
            rl.close();
          }else{
            writeStream.write(input+'\n');
            rl.setPrompt('Anything else? (press Ctrl+C or write "exit" to stop.\n');
            rl.prompt();
          }
      })
    });
  });

rl.on('close', () =>{ console.log('Goodbye!')})