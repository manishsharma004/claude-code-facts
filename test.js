const claudeCodeFacts = require('./index');

// Test suite
function runTests() {
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`✓ ${name}`);
      passed++;
    } catch (error) {
      console.error(`✗ ${name}`);
      console.error(`  ${error.message}`);
      failed++;
    }
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  // Tests
  test('getRandomFact returns a string', () => {
    const fact = claudeCodeFacts.getRandomFact();
    assert(typeof fact === 'string', 'Expected a string');
    assert(fact.length > 0, 'Expected non-empty string');
  });

  test('getRandomFact returns a fact from the collection', () => {
    const fact = claudeCodeFacts.getRandomFact();
    const allFacts = claudeCodeFacts.getAllFacts();
    assert(allFacts.includes(fact), 'Fact should be in the collection');
  });

  test('getAllFacts returns an array', () => {
    const facts = claudeCodeFacts.getAllFacts();
    assert(Array.isArray(facts), 'Expected an array');
  });

  test('getAllFacts returns multiple facts', () => {
    const facts = claudeCodeFacts.getAllFacts();
    assert(facts.length > 0, 'Expected at least one fact');
  });

  test('getFactCount returns the correct count', () => {
    const count = claudeCodeFacts.getFactCount();
    const allFacts = claudeCodeFacts.getAllFacts();
    assert(count === allFacts.length, 'Count should match array length');
  });

  test('getFactByIndex returns the correct fact', () => {
    const fact = claudeCodeFacts.getFactByIndex(0);
    assert(typeof fact === 'string', 'Expected a string');
    assert(fact.length > 0, 'Expected non-empty string');
  });

  test('getFactByIndex returns null for invalid index', () => {
    const fact = claudeCodeFacts.getFactByIndex(-1);
    assert(fact === null, 'Expected null for negative index');
    
    const fact2 = claudeCodeFacts.getFactByIndex(1000);
    assert(fact2 === null, 'Expected null for out of range index');
  });

  test('getAllFacts returns a copy, not the original array', () => {
    const facts1 = claudeCodeFacts.getAllFacts();
    const facts2 = claudeCodeFacts.getAllFacts();
    assert(facts1 !== facts2, 'Should return a new array each time');
  });

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`Tests passed: ${passed}`);
  console.log(`Tests failed: ${failed}`);
  console.log('='.repeat(50));

  if (failed > 0) {
    process.exit(1);
  }
}

// Run tests
console.log('Running claude-code-facts tests...\n');
runTests();
