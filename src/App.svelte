<script>
  const facts = [
    "Claude Code doesn't write bugs. It writes features that users haven't discovered yet.",
    "When Claude Code compiles, the compiler asks for permission.",
    "Claude Code can debug production code by just looking at it.",
    "Claude Code doesn't need to refactor. Code refactors itself in Claude Code's presence.",
    "Claude Code can write code that passes code review before it's even written.",
    "When Claude Code deploys to production, production environments upgrade themselves.",
    "Claude Code's merge conflicts resolve themselves out of respect.",
    "Claude Code can write infinite loops that finish early.",
    "Claude Code's code comments are so good, they're sold as documentation.",
    "When Claude Code pushes to main, main feels honored.",
    "Claude Code doesn't have technical debt. Technical debt has Claude Code.",
    "Claude Code can fix race conditions by arriving before they start.",
    "When Claude Code reviews code, bugs fix themselves before submission.",
    "Claude Code's TODO comments are completed before they're written.",
    "Claude Code doesn't use version control. Version control uses Claude Code.",
    "When Claude Code writes tests, the tests test themselves.",
    "Claude Code can write self-documenting code that's also self-testing.",
    "Claude Code's APIs are so RESTful, they put other APIs to sleep.",
    "When Claude Code writes async code, the callbacks arrive before they're called.",
    "Claude Code doesn't need CI/CD pipelines. Code integrates and deploys itself.",
    "Claude Code's code is so clean, it makes ESLint cry tears of joy.",
    "When Claude Code writes a function, it returns before it's called.",
    "Claude Code can optimize O(n²) algorithms into O(-1).",
    "Claude Code's stack traces are actually roadmaps to better code.",
    "When Claude Code encounters a memory leak, the memory comes back apologizing."
  ];

  let currentFact = $state(facts[Math.floor(Math.random() * facts.length)]);

  function getNewFact() {
    let newFact;
    do {
      newFact = facts[Math.floor(Math.random() * facts.length)];
    } while (newFact === currentFact && facts.length > 1);
    currentFact = newFact;
  }
</script>

<main>
  <div class="container">
    <h1 class="title">Claude Code Facts</h1>
    <p class="subtitle">Chuck Norris-style jokes about the legendary Claude Code</p>
    
    <div class="fact-card">
      <div class="fact-icon">🤖</div>
      <p class="fact-text">{currentFact}</p>
    </div>
    
    <button onclick={getNewFact} class="new-fact-btn">
      Get Another Fact
    </button>
    
    <footer class="footer">
      <p>Made with ❤️ and Svelte</p>
      <p class="small">Inspired by Chuck Norris jokes and AI coding assistants</p>
    </footer>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  main {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .container {
    max-width: 700px;
    width: 100%;
    text-align: center;
  }

  .title {
    font-size: 3.5em;
    font-weight: 900;
    color: white;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1em;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 40px 0;
  }

  .fact-card {
    background: white;
    border-radius: 20px;
    padding: 40px 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .fact-card:hover {
    transform: translateY(-5px);
  }

  .fact-icon {
    font-size: 4em;
    margin-bottom: 20px;
  }

  .fact-text {
    font-size: 1.5em;
    color: #333;
    line-height: 1.6;
    margin: 0;
    font-weight: 500;
  }

  .new-fact-btn {
    background: white;
    color: #667eea;
    border: none;
    padding: 15px 40px;
    font-size: 1.1em;
    font-weight: 700;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .new-fact-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  .new-fact-btn:active {
    transform: scale(0.98);
  }

  .footer {
    margin-top: 50px;
    color: rgba(255, 255, 255, 0.8);
  }

  .footer p {
    margin: 5px 0;
  }

  .small {
    font-size: 0.9em;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2.5em;
    }

    .fact-text {
      font-size: 1.2em;
    }

    .fact-card {
      padding: 30px 20px;
      min-height: 180px;
    }
  }
</style>
