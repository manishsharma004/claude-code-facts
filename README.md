# claude-code-facts

Chuck Norris style jokes based on claude-code hype.

## Installation

```bash
npm install claude-code-facts
```

## Usage

```javascript
const claudeCodeFacts = require('claude-code-facts');

// Get a random Claude Code fact
console.log(claudeCodeFacts.getRandomFact());
// => "Claude Code doesn't write bugs. It writes features that other developers call bugs."

// Get all facts
const allFacts = claudeCodeFacts.getAllFacts();
console.log(`Total facts: ${allFacts.length}`);

// Get the count of facts
const count = claudeCodeFacts.getFactCount();
console.log(`There are ${count} facts available`);

// Get a specific fact by index
const firstFact = claudeCodeFacts.getFactByIndex(0);
console.log(firstFact);
```

## API

### `getRandomFact()`

Returns a random Claude Code fact.

**Returns:** `string` - A random fact about Claude Code

### `getAllFacts()`

Returns all Claude Code facts as an array.

**Returns:** `Array<string>` - Array of all facts

### `getFactCount()`

Returns the total number of facts available.

**Returns:** `number` - Total number of facts

### `getFactByIndex(index)`

Returns a specific fact by its index.

**Parameters:**
- `index` (number) - The index of the fact (0-based)

**Returns:** `string|null` - The fact at the given index or null if index is invalid

## Testing

```bash
npm test
```

## Contributing

Feel free to submit pull requests with more Claude Code facts!

## License

MIT
