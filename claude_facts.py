#!/usr/bin/env python3
"""
Claude Code Facts - A CLI tool to display Claude Code jokes
"""
import json
import random
import sys
from pathlib import Path


def load_jokes():
    """Load jokes from the JSON file"""
    json_file = Path(__file__).parent / 'claude_code_jokes.json'
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data['jokes']
    except FileNotFoundError:
        print(f"Error: Could not find {json_file}")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in {json_file}")
        sys.exit(1)


def display_joke(joke, number=None):
    """Display a single joke with its icon"""
    prefix = f"#{number} " if number else ""
    print(f"{prefix}{joke['icon']} {joke['text']}")


def show_random_joke(jokes):
    """Display a random joke"""
    joke = random.choice(jokes)
    print("\n🎲 Random Claude Code Fact:\n")
    display_joke(joke)
    print()


def show_all_jokes(jokes):
    """Display all jokes"""
    print(f"\n📚 All {len(jokes)} Claude Code Facts:\n")
    print("=" * 80)
    for i, joke in enumerate(jokes, 1):
        display_joke(joke, i)
        if i < len(jokes):
            print()
    print("=" * 80)
    print()


def show_help():
    """Display help message"""
    help_text = """
╔══════════════════════════════════════════════════════════════╗
║              Claude Code Facts - CLI Tool                    ║
╚══════════════════════════════════════════════════════════════╝

Usage:
    python claude_facts.py [option]

Options:
    (no option)    Show a random Claude Code fact
    --all          Show all Claude Code facts
    --help, -h     Show this help message

Examples:
    python claude_facts.py              # Random joke
    python claude_facts.py --all        # All jokes
    python claude_facts.py --help       # This message

"""
    print(help_text)


def main():
    """Main function"""
    # Parse command line arguments
    args = sys.argv[1:]
    
    if '--help' in args or '-h' in args:
        show_help()
        return
    
    # Load jokes
    jokes = load_jokes()
    
    if not jokes:
        print("Error: No jokes found!")
        sys.exit(1)
    
    # Display jokes based on arguments
    if '--all' in args:
        show_all_jokes(jokes)
    else:
        show_random_joke(jokes)


if __name__ == '__main__':
    main()
