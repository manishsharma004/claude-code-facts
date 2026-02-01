<script>
  import { onMount } from 'svelte';
  import jokes from './jokes.json';
  import Settings from './components/Settings.svelte';
  import { initDB, getAllGeneratedFacts, saveGeneratedFact } from './lib/db.js';
  import { generateFact } from './lib/llm.js';

  let showAll = $state(false);
  let currentJokeIndex = $state(Math.floor(Math.random() * jokes.length));
  let settingsOpen = $state(false);
  let generating = $state(false);
  let generatedFacts = $state([]);
  let allFacts = $derived([...jokes, ...generatedFacts]);
  let useGeneratedFacts = $state(true);

  onMount(async () => {
    await initDB();
    generatedFacts = await getAllGeneratedFacts();
  });

  function getNewFact() {
    const factsToUse = useGeneratedFacts ? allFacts : jokes;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * factsToUse.length);
    } while (newIndex === currentJokeIndex && factsToUse.length > 1);
    currentJokeIndex = newIndex;
  }

  function toggleShowAll() {
    showAll = !showAll;
  }

  function openSettings() {
    settingsOpen = true;
  }

  async function generateNewFact() {
    generating = true;
    try {
      const factText = await generateFact();
      
      // Pick a random icon from existing jokes
      const icons = jokes.map(j => j.icon);
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      
      // Save to IndexedDB
      await saveGeneratedFact(factText, randomIcon, 'ai-generated');
      
      // Reload generated facts
      const updatedFacts = await getAllGeneratedFacts();
      generatedFacts = updatedFacts;
      
      // Show the new fact (last in the combined array)
      currentJokeIndex = jokes.length + updatedFacts.length - 1;
      showAll = false;
    } catch (error) {
      alert('Error generating fact: ' + error.message);
    } finally {
      generating = false;
    }
  }

  const currentFact = $derived(useGeneratedFacts ? allFacts[currentJokeIndex] : jokes[currentJokeIndex]);
</script>

<main>
  <Settings bind:isOpen={settingsOpen} />
  
  <div class="container">
    <div class="header-controls">
      <button class="settings-btn" onclick={openSettings} title="Settings">
        ⚙️
      </button>
    </div>
    
    <h1 class="title">Claude Code Facts</h1>
    <p class="subtitle">Chuck Norris-style jokes about the legendary Claude Code</p>
    
    {#if !showAll}
      <div class="fact-card">
        <div class="fact-icon">{currentFact.icon}</div>
        <p class="fact-text">{currentFact.text}</p>
        {#if currentFact.provider}
          <span class="ai-badge">🤖 AI Generated</span>
        {/if}
      </div>
      
      <div class="button-group">
        <button onclick={getNewFact} class="new-fact-btn">
          Get Another Fact
        </button>
        <button onclick={generateNewFact} class="generate-btn" disabled={generating}>
          {generating ? '🔄 Generating...' : '✨ Generate with AI'}
        </button>
        <button onclick={toggleShowAll} class="show-all-btn">
          Show All Facts
        </button>
      </div>
    {:else}
      <div class="all-jokes-container">
        {#each allFacts as joke, index}
          <div class="joke-item">
            <div class="joke-number">{index + 1}</div>
            <div class="joke-icon">{joke.icon}</div>
            <div class="joke-content">
              <p class="joke-text">{joke.text}</p>
              {#if joke.provider}
                <span class="ai-badge-small">🤖 AI</span>
              {/if}
            </div>
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
      {#if generatedFacts.length > 0}
        <p class="small">✨ {generatedFacts.length} AI-generated fact{generatedFacts.length !== 1 ? 's' : ''} added</p>
      {/if}
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
    position: relative;
  }

  .header-controls {
    position: absolute;
    top: -10px;
    right: 0;
    z-index: 10;
  }

  .settings-btn {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5em;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .settings-btn:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
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

  .show-all-btn, .back-btn, .generate-btn {
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

  .generate-btn {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border-color: transparent;
  }

  .generate-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(245, 87, 108, 0.4);
  }

  .generate-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

  .joke-content {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .joke-text {
    font-size: 1.1em;
    color: #333;
    line-height: 1.5;
    margin: 0;
    flex: 1;
  }

  .ai-badge {
    display: inline-block;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    padding: 6px 15px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 600;
    margin-top: 12px;
  }

  .ai-badge-small {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75em;
    font-weight: 600;
    white-space: nowrap;
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
