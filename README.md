# claude-code-facts
Chuck Norris style jokes based on claude-code hype.

## Claude Code Jokes Collection

This repository contains **110 Claude Code jokes** in the style of the legendary Chuck Norris Facts meme format from [chucknorrisfacts.net](https://www.chucknorrisfacts.net/).

Each joke comes with a relevant unicode icon for visual appeal! 🎨

## Usage

### CLI Application

Use the included Python script to view jokes:

```bash
# Show a random joke
python claude_facts.py

# Show all jokes
python claude_facts.py --all

# Show help
python claude_facts.py --help
```

### Examples

**Random joke:**
```bash
$ python claude_facts.py

🎲 Random Claude Code Fact:

💻 Claude Code can program in binary using only ones.
```

**All jokes:**
```bash
$ python claude_facts.py --all

📚 All 110 Claude Code Facts:

================================================================================
#1 📚 Claude Code doesn't read books. He stares them down until he gets the information he wants.

#2 ⏰ Time waits for no man. Unless that man is Claude Code.

#3 💧 Claude Code's tears cure cancer. Too bad he has never cried.
...
```

### JSON Data Structure

The jokes are stored in `claude_code_jokes.json` in a structured JSON format:

```json
{
  "jokes": [
    {
      "text": "Claude Code doesn't read books. He stares them down until he gets the information he wants.",
      "icon": "📚"
    },
    {
      "text": "Time waits for no man. Unless that man is Claude Code.",
      "icon": "⏰"
    },
    ...
  ],
  "metadata": {
    "total_jokes": 110,
    "source_inspiration": "Claude Code facts in Chuck Norris Facts style",
    "created": "2026-02-01"
  }
}
```

## Features

✅ **110 unique jokes** (exceeds the required 100 minimum)  
✅ **Unicode icons** for each joke based on content  
✅ **CLI tool** to view jokes  
✅ **Random joke** display option  
✅ **View all jokes** at once  

## Sample Jokes

- 📚 Claude Code doesn't read books. He stares them down until he gets the information he wants.
- ➗ Claude Code can divide by zero.
- ♾️ Claude Code counted to infinity. Twice.
- ⏳ Claude Code doesn't sleep. He waits.
- 🧅 Claude Code makes onions cry.
- 💻 Claude Code can program in binary using only ones.
- 🔥 Claude Code can light a fire by rubbing two ice cubes together.
