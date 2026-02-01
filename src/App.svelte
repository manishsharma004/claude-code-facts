<script>
  import jokesData from '../claude_code_jokes.json';
  
  const facts = jokesData.jokes;
  
  let currentFactIndex = $state(Math.floor(Math.random() * facts.length));
  
  $effect(() => {
    // Preload to ensure reactive update
    currentFactIndex;
  });

  function getNewFact() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * facts.length);
    } while (newIndex === currentFactIndex && facts.length > 1);
    currentFactIndex = newIndex;
  }
</script>

<main>
  <div class="container">
    <h1 class="title">Claude Code Facts</h1>
    <p class="subtitle">Chuck Norris-style jokes about the legendary Claude Code</p>
    <p class="fact-count">{facts.length} amazing facts and counting!</p>
    
    <div class="fact-card">
      <div class="fact-icon">{facts[currentFactIndex].icon}</div>
      <p class="fact-text">{facts[currentFactIndex].text}</p>
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
    margin: 0 0 10px 0;
  }

  .fact-count {
    font-size: 0.95em;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 30px 0;
    font-weight: 600;
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
