/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.chain = this.makeChains(words);
    // MORE CODE HERE
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat", "the"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  //["the", "cat", "the"]
  //{"the": ["cat", "undef"], "cat": ["the"], }

  makeChains(words) {
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
    return chain;
  }


  /** return random text from chains */

  getText(numWords = 100) {
    // MORE CODE HERE
  }
}

module.exports = {MarkovMachine}