/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

function readTextFromSource(type, source) {
  return new Promise((resolve, reject) => {
    if (type === 'file') {
      fs.readFile(source, 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    } else if (type === 'url') {
      axios.get(source)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } else {
      reject(new Error('Invalid type. Use "file" or "url".'));
    }
  });
}

async function generateText(type, source) {
  try {
    const text = await readTextFromSource(type, source);
    const mm = new MarkovMachine(text);
    const randomText = mm.makeText(100);
    console.log(randomText);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Get command-line arguments
const [type, source] = process.argv.slice(2);

// Call the generateText function
generateText(type, source);
