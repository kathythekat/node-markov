/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.chain = this.makeChain(words);
    this.firstWords = words.slice(0,3);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  //["the", "cat", "the"]
  //{"the": ["cat", "undef"], "cat": ["the"], }

 

  makeChain(words) {
    let chain = {};
    for(let i = 0; i < words.length; i++) {
      if (chain[words[i]] === undefined) { 
        if (i === words.length - 1) {
          chain[words[i]] = [null];
        } else {
          chain[words[i]] = [words[i + 1]];
        }
      } else {
        if (i === words.length - 1)  {
          chain[words[i]].push(null);
        } else {
          chain[words[i]].push(words[i + 1]);
        }
      } 
    }
    // stop the array one short and push the next
    return chain;
  }


  /** return random text from chains */

  
  getText(numWords = 100) {
    let wc = 0;
    let result = '';
    let currentNext = pickRandomFromArray(this.firstWords);
    while(wc < numWords){
      if(currentNext === null){
        result += '. ';
        currentNext = pickRandomFromArray(this.firstWords);
      }
        result += currentNext + ' ';
        wc ++;
        let nextOptions = this.chain[currentNext];
        currentNext = pickRandomFromArray(nextOptions);
    }
    return result + '.';
  }
  // another way, build an array and join them at the end
}

function pickRandomFromArray(arr){
  return arr[Math.floor( Math.random() * arr.length )]
}

module.exports = {MarkovMachine}