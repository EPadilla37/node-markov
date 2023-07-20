const MarkovMachine = require('./markov');

describe('MarkovMachine', () => {
  test('Test Markov Machine Initialization', () => {
    const mm = new MarkovMachine('the cat in the hat');
    expect(mm.words).toEqual(['the', 'cat', 'in', 'the', 'hat']);
    expect(mm.chains).toEqual({
      'the': ['cat', 'hat'],
      'cat': ['in'],
      'in': ['the'],
      'hat': [null],
    });
  });

  test('Test Text Generation', () => {
    const mm = new MarkovMachine('the cat in the hat');
    const generatedText = mm.makeText();
    expect(generatedText).not.toBeUndefined();
    expect(typeof generatedText).toBe('string');
  });

  test('Test Output Length', () => {
    const mm = new MarkovMachine('the cat in the hat');
    const generatedText = mm.makeText(10);
    const wordCount = generatedText.split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(1);
    expect(wordCount).toBeLessThanOrEqual(10);
  });
});
