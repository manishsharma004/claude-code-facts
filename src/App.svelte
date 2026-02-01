<script>
  import jokes from './jokes.json';

  let showAll = $state(false);
  let currentJokeIndex = $state(Math.floor(Math.random() * jokes.length));

  function getNewFact() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * jokes.length);
    } while (newIndex === currentJokeIndex && jokes.length > 1);
    currentJokeIndex = newIndex;
  }

  function toggleShowAll() {
    showAll = !showAll;
  }
</script>

<main>
  <div class="container">
    <h1 class="title">Claude Code Facts</h1>
    <p class="subtitle">Chuck Norris-style jokes about the legendary Claude Code</p>
    
    {#if !showAll}
      <div class="fact-card">
        <div class="fact-icon">{jokes[currentJokeIndex].icon}</div>
        <p class="fact-text">{jokes[currentJokeIndex].text}</p>
      </div>
      
      <div class="button-group">
        <button onclick={getNewFact} class="new-fact-btn">
          Get Another Fact
        </button>
        <button onclick={toggleShowAll} class="show-all-btn">
          Show All Facts
        </button>
      </div>
    {:else}
      <div class="all-jokes-container">
        {#each jokes as joke, index}
          <div class="joke-item">
            <div class="joke-number">{index + 1}</div>
            <div class="joke-icon">{joke.icon}</div>
            <p class="joke-text">{joke.text}</p>
          </div>
        {/each}
      </div>
      
      <button onclick={toggleShowAll} class="back-btn">
        Back to Random Facts
      </button>
    {/if}
    
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

  .button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .show-all-btn, .back-btn {
    background: rgba(255, 255, 255, 0.9);
    color: #764ba2;
    border: 2px solid white;
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

  .show-all-btn:hover, .back-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: white;
  }

  .show-all-btn:active, .back-btn:active {
    transform: scale(0.98);
  }

  .all-jokes-container {
    max-height: 70vh;
    overflow-y: auto;
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
  }

  .joke-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    margin-bottom: 15px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 10px;
    transition: transform 0.2s ease;
  }

  .joke-item:hover {
    transform: translateX(5px);
  }

  .joke-number {
    font-size: 1.2em;
    font-weight: 700;
    color: #667eea;
    min-width: 40px;
    text-align: center;
  }

  .joke-icon {
    font-size: 2em;
    min-width: 50px;
    text-align: center;
  }

  .joke-text {
    font-size: 1.1em;
    color: #333;
    line-height: 1.5;
    margin: 0;
    flex: 1;
  }

  .back-btn {
    margin-top: 20px;
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
