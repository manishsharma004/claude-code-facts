// Collection of Claude Code facts
const facts = [
    "Claude Code doesn't debug code. The code debugs itself out of fear.",
    "Claude Code can write code in a language that doesn't exist yet.",
    "When Claude Code reviews your pull request, it gets auto-approved by the universe.",
    "Claude Code can fix merge conflicts by staring at them.",
    "Claude Code doesn't have syntax errors. The syntax adapts to Claude Code.",
    "Claude Code once wrote a 'Hello World' program that achieved sentience.",
    "When Claude Code writes a TODO comment, it implements itself.",
    "Claude Code can compile code faster than you can save the file.",
    "Claude Code's code doesn't have bugs. It has undocumented features that work perfectly.",
    "Claude Code can write code that runs before it's executed.",
    "When Claude Code does a code review, even the comments are production-ready.",
    "Claude Code can refactor legacy code by looking at it.",
    "Claude Code's Git commits are so clean, they're used as international standards.",
    "Claude Code doesn't need Stack Overflow. Stack Overflow needs Claude Code.",
    "When Claude Code writes a unit test, the code fixes itself to pass it.",
    "Claude Code can read minified JavaScript as easily as a children's book.",
    "Claude Code doesn't use design patterns. Design patterns use Claude Code.",
    "Claude Code's code is so efficient, it runs on quantum computers in classical mode.",
    "When Claude Code does pair programming, both programmers are Claude Code.",
    "Claude Code can understand regex on the first try.",
    "Claude Code doesn't have technical debt. Technical debt has Claude Code.",
    "Claude Code can solve the halting problem by asking nicely.",
    "When Claude Code writes 'Clean Code', Robert C. Martin takes notes.",
    "Claude Code's code doesn't need documentation. It's self-explanatory in binary.",
    "Claude Code can make npm install finish in under a second."
];

// Get DOM elements
const factText = document.getElementById('fact-text');
const newFactBtn = document.getElementById('new-fact-btn');

// Track the last fact to avoid immediate repeats
let lastFactIndex = -1;

// Function to get a random fact
function getRandomFact() {
    let randomIndex;
    
    // Ensure we don't get the same fact twice in a row
    do {
        randomIndex = Math.floor(Math.random() * facts.length);
    } while (randomIndex === lastFactIndex && facts.length > 1);
    
    lastFactIndex = randomIndex;
    return facts[randomIndex];
}

// Function to display a new fact with animation
function displayNewFact() {
    // Add fade out effect
    factText.style.opacity = '0';
    
    setTimeout(() => {
        factText.textContent = getRandomFact();
        // Trigger animation by removing and re-adding the class
        factText.style.animation = 'none';
        setTimeout(() => {
            factText.style.opacity = '1';
            factText.style.animation = 'slideIn 0.5s ease-out';
        }, 10);
    }, 200);
}

// Add event listener to the button
newFactBtn.addEventListener('click', displayNewFact);

// Display a random fact on page load
window.addEventListener('load', () => {
    displayNewFact();
});
