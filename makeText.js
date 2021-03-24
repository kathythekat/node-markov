/** Command-line tool to generate Markov text. */

const fsP = require('fs').promises;
const axios = require("axios");
const {MarkovMachine} = require('./markov');
let M = null;


async function processPath(type, path) {
    try {
        let contents = null;
        if(type === 'url'){
            contents = await axios.get(path);
            contents = contents.data;
        } else {
            contents = await fsP.readFile(path, "utf8");
        }
        console.log()
        M = new MarkovMachine(contents)
        console.log(M.getText(len))
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
  }



let [type, path, len] = process.argv.slice(2,5);
len = +len;

processPath(type, path);

// if(outputPath){
//     await fsP.writeFile(outputPath, contents.data, "utf8");
// }