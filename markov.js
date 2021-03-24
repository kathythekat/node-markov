/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.chain = this.makeChain(words);
    this.firstWords = [words[0]]

    words.forEach(word => {
      if (word[0].toUpperCase() === word[0]) {
        this.firstWords.push(word);
      }
    })
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  //["the", "cat", "the"]
  //{"the": ["cat", "undef"], "cat": ["the"], }

 

  makeChain(words) {
    let chain = {};
    const lastIndex = words.length - 1;
    for(let i = 0; i < lastIndex; i++) {
      if (chain[words[i]] === undefined) { 
        chain[words[i]] = [words[i + 1]];
        
      } else {
        chain[words[i]].push(words[i + 1]);
      } 
    }
    if (chain[words[lastIndex]]) {
      chain[words[lastIndex]].push(null);
    } else {
      chain[words[lastIndex]] = [null];
    }
    // stop the array one short and push the next
    return chain;
  }


  /** return random text from chains */
  getText(numWords = 100) {
    let wc = 0;
    let result = '';
    let current = pickRandomFromArray(this.firstWords);
    let next = pickRandomFromArray(this.chain[current]);
    while(wc < numWords){
      if(next === null){
        result += current + '. ';
        current = pickRandomFromArray(this.firstWords);
      } else {
        result += current + ' ';
        current = next;
      }
      next = pickRandomFromArray(this.chain[current]);
      wc ++;
    }
    return result.slice(0, result.length - 1);
  }
}


function pickRandomFromArray(arr){
  return arr[Math.floor( Math.random() * arr.length )]
}

module.exports = {MarkovMachine}