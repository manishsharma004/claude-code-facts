# claude-code-facts

Chuck Norris style jokes based on claude-code hype.

A fun web application built with Svelte that displays Chuck Norris-style facts about the legendary Claude Code AI assistant. Now featuring 110+ unique facts with emoji icons!

## 🌐 Live Website

Visit the website at: **[https://manishsharma004.github.io/claude-code-facts](https://manishsharma004.github.io/claude-code-facts)**

## Features

- 🤖 **110+ hilarious Claude Code facts** with contextual emoji icons
- 🎲 Random fact generator
- 📱 Responsive design
- ⚡ Built with Svelte and Vite for blazing fast performance
- 🎨 Beautiful gradient UI with smooth animations
- 💻 Optional Python CLI tool for terminal enthusiasts

## Getting Started

### Web Application

#### Prerequisites

- Node.js (version 20.19 or higher)
- npm

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/manishsharma004/claude-code-facts.git
cd claude-code-facts
```

2. Install dependencies:
```bash
npm install
```

#### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

#### Build

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

#### Preview

Preview the production build:

```bash
npm run preview
```

### Python CLI (Optional)

For those who prefer the terminal, we also provide a Python CLI tool:

```bash
# Show a random fact
python claude_facts.py

# Show all facts
python claude_facts.py --all

# Show help
python claude_facts.py --help
```

## Data Structure

All facts are stored in `claude_code_jokes.json` with the following structure:

```json
{
  "jokes": [
    {
      "text": "Claude Code doesn't read books. He stares them down until he gets the information he wants.",
      "icon": "📚"
    }
  ],
  "metadata": {
    "total_jokes": 110,
    "source_inspiration": "Claude Code facts in Chuck Norris Facts style",
    "created": "2026-02-01"
  }
}
```

## Tech Stack

- **Svelte 5** - Modern reactive UI framework
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling with gradients and animations
- **Python 3** - Optional CLI tool

## 📦 Deployment

This repository is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:
- Triggers on every push to the `main` branch
- Can be manually triggered via workflow dispatch
- Builds the Svelte application
- Deploys the built files to GitHub Pages

**Setup**: Ensure GitHub Pages is enabled in repository settings: **Settings → Pages → Source: GitHub Actions**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Made with ❤️ and Svelte. Inspired by Chuck Norris jokes and AI coding assistants.
