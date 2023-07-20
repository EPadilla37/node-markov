class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    // Implement the code to build the Markov chains here
    this.chains = {};
    for (let i = 0; i < this.words.length - 1; i++) {
      const currentWord = this.words[i];
      const nextWord = this.words[i + 1];

      // Check if currentWord is already in the chains, if not, add it with an empty array
      if (!this.chains[currentWord]) {
        this.chains[currentWord] = [];
      }

      // Push the nextWord to the array of possible next words for the currentWord
      this.chains[currentWord].push(nextWord);
    }

    // Add a null value to the last word's list of possible next words
    const lastWord = this.words[this.words.length - 1];
    if (!this.chains[lastWord]) {
      this.chains[lastWord] = [];
    }
    this.chains[lastWord].push(null);
  }

  makeText(numWords = 100) {
    // Implement the code to generate random text from the Markov chains here
    const words = Object.keys(this.chains);
    let startWord = words[Math.floor(Math.random() * words.length)];
    let output = [startWord];

    while (output.length < numWords && startWord !== null) {
      const possibleNextWords = this.chains[startWord];
      const nextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
      output.push(nextWord);
      startWord = nextWord;
    }

    return output.join(' ');
  }
}

module.exports = MarkovMachine;

