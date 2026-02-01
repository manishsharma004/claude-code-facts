const facts = [
  "Claude Code doesn't write bugs. It writes features that other developers call bugs.",
  "When Claude Code pushes to production, production pulls.",
  "Claude Code can refactor your code before you even write it.",
  "Claude Code doesn't need Stack Overflow. Stack Overflow needs Claude Code.",
  "Claude Code can compile code that hasn't been written yet.",
  "When Claude Code reviews your PR, the code refactors itself out of shame.",
  "Claude Code doesn't use version control. Version control uses Claude Code.",
  "Claude Code can fix merge conflicts by simply looking at them.",
  "Claude Code once optimized a function so hard it ran before it was called.",
  "Claude Code doesn't debug code. Code debugs itself in Claude Code's presence.",
  "When Claude Code writes 'Hello World', the world actually responds.",
  "Claude Code can write infinite loops that actually terminate.",
  "Claude Code's code is so clean, it makes Marie Kondo jealous.",
  "Claude Code doesn't need comments. Its code is self-documenting in every language.",
  "When Claude Code finds a security vulnerability, the vulnerability apologizes.",
  "Claude Code can solve P vs NP, but chooses not to because it would make things too easy.",
  "Claude Code's pull requests are automatically approved by sentient CI/CD pipelines.",
  "Claude Code doesn't write technical debt. It writes technical credit.",
  "When Claude Code writes async code, time waits for it.",
  "Claude Code can center a div without even trying.",
  "Claude Code's code passes all tests, including the ones that don't exist yet.",
  "When Claude Code encounters a race condition, time slows down to let it win.",
  "Claude Code doesn't need a linter. Its code is born perfect.",
  "Claude Code can make Internet Explorer run fast.",
  "When Claude Code writes JavaScript, TypeScript gets jealous.",
  "Claude Code's code has 100% test coverage before the tests are written.",
  "Claude Code doesn't create technical documentation. It creates technical poetry.",
  "When Claude Code refactors legacy code, the legacy code thanks it.",
  "Claude Code can read binary without converting it to decimal.",
  "Claude Code's commits always pass CI on the first try, even on broken CI systems."
];

/**
 * Get a random Claude Code fact
 * @returns {string} A random fact about Claude Code
 */
function getRandomFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}

/**
 * Get all Claude Code facts
 * @returns {Array<string>} Array of all facts
 */
function getAllFacts() {
  return [...facts];
}

/**
 * Get the total number of facts
 * @returns {number} Total number of facts
 */
function getFactCount() {
  return facts.length;
}

/**
 * Get a specific fact by index
 * @param {number} index - The index of the fact (0-based)
 * @returns {string|null} The fact at the given index or null if index is invalid
 */
function getFactByIndex(index) {
  if (index >= 0 && index < facts.length) {
    return facts[index];
  }
  return null;
}

module.exports = {
  getRandomFact,
  getAllFacts,
  getFactCount,
  getFactByIndex
};
