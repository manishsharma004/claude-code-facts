<script>
  import { PROVIDERS, testConnection, fetchModels } from '../lib/llm.js';
  import { getConfig, setConfig } from '../lib/db.js';
  import { onMount } from 'svelte';

  let { isOpen = $bindable(false) } = $props();

  let selectedProvider = $state('');
  let apiKey = $state('');
  let baseUrl = $state('');
  let selectedModel = $state('');
  let testResult = $state(null);
  let testing = $state(false);
  let saving = $state(false);
  let availableModels = $state([]);
  let fetchingModels = $state(false);
  let modelsError = $state('');

  const currentProvider = $derived(PROVIDERS.find(p => p.id === selectedProvider));

  onMount(async () => {
    // Load saved configuration
    selectedProvider = await getConfig('selectedProvider') || '';
    apiKey = await getConfig('apiKey') || '';
    baseUrl = await getConfig('baseUrl') || '';
    selectedModel = await getConfig('selectedModel') || '';
    
    // If we have saved settings, populate availableModels with at least the selected model
    // This allows the save button to work without requiring a refresh
    if (selectedProvider && selectedModel) {
      availableModels = [selectedModel];
    }
  });

  async function loadAvailableModels() {
    if (!selectedProvider) return;
    
    fetchingModels = true;
    modelsError = '';
    try {
      const provider = PROVIDERS.find(p => p.id === selectedProvider);
      
      // For providers that need API key, require it before fetching
      if (provider.requiresApiKey && !apiKey) {
        availableModels = [];
        modelsError = 'API key required to fetch models';
        return;
      }
      
      // For providers that need base URL, require it before fetching
      if (provider.requiresBaseUrl && !baseUrl) {
        availableModels = [];
        modelsError = 'Base URL required to fetch models';
        return;
      }
      
      // Fetch models from the provider
      const models = await fetchModels(selectedProvider, apiKey, baseUrl);
      availableModels = models;
      modelsError = '';
      
      // If current selected model is not in the list, select the first one or default
      if (!availableModels.includes(selectedModel)) {
        selectedModel = availableModels[0] || provider.defaultModel;
      }
    } catch (error) {
      // Show error - do not fall back to hardcoded models
      availableModels = [];
      modelsError = error.message || 'Failed to fetch models';
    } finally {
      fetchingModels = false;
    }
  }

  async function handleProviderChange() {
    const provider = PROVIDERS.find(p => p.id === selectedProvider);
    if (provider) {
      selectedModel = provider.defaultModel;
      if (provider.defaultBaseUrl) {
        baseUrl = provider.defaultBaseUrl;
      }
      
      // Reset models and error
      availableModels = [];
      modelsError = '';
      
      // Don't automatically fetch models - let user click "Refresh Models" button
      // This avoids unnecessary network requests and permission prompts
    }
    testResult = null;
  }

  async function handleFetchModels() {
    await loadAvailableModels();
  }

  async function handleTestConnection() {
    testing = true;
    testResult = null;

    try {
      const result = await testConnection(selectedProvider, apiKey, baseUrl, selectedModel);
      testResult = result;
    } catch (error) {
      testResult = { success: false, message: error.message };
    } finally {
      testing = false;
    }
  }

  async function handleSave() {
    saving = true;
    try {
      await setConfig('selectedProvider', selectedProvider);
      await setConfig('apiKey', apiKey);
      await setConfig('baseUrl', baseUrl);
      await setConfig('selectedModel', selectedModel);
      
      // Close modal after a short delay
      setTimeout(() => {
        isOpen = false;
        saving = false;
      }, 500);
    } catch (error) {
      alert('Error saving configuration: ' + error.message);
      saving = false;
    }
  }

  function handleClose() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="modal-overlay" onclick={handleClose} role="button" tabindex="0" onkeydown={(e) => e.key === 'Escape' && handleClose()}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()} role="dialog" tabindex="-1">
      <div class="modal-header">
        <h2>⚙️ LLM Provider Settings</h2>
        <button class="close-btn" onclick={handleClose}>✕</button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label for="provider">LLM Provider</label>
          <select
            id="provider"
            bind:value={selectedProvider}
            onchange={handleProviderChange}
          >
            <option value="">Select a provider...</option>
            {#each PROVIDERS as provider}
              <option value={provider.id}>{provider.name}</option>
            {/each}
          </select>
          <p class="help-text">Choose an LLM provider to generate new facts</p>
        </div>

        {#if currentProvider}
          {#if currentProvider.requiresApiKey}
            <div class="form-group">
              <label for="apiKey">API Key</label>
              <input
                id="apiKey"
                type="password"
                bind:value={apiKey}
                placeholder="Enter your API key"
                onblur={handleFetchModels}
              />
              <p class="help-text">
                Your API key is stored locally in your browser and never sent anywhere except to {currentProvider.name}
              </p>
            </div>
          {/if}

          {#if currentProvider.requiresBaseUrl}
            <div class="form-group">
              <label for="baseUrl">Base URL</label>
              <input
                id="baseUrl"
                type="text"
                bind:value={baseUrl}
                placeholder={currentProvider.defaultBaseUrl}
                onblur={handleFetchModels}
              />
              <p class="help-text">
                URL where Ollama is running (default: {currentProvider.defaultBaseUrl})<br/>
                <strong>Note:</strong> You may need to configure CORS by setting the <code>OLLAMA_ORIGINS</code> environment variable.
              </p>
            </div>
          {/if}

          <div class="form-group">
            <div class="model-header">
              <label for="model">Model</label>
              <button
                class="fetch-models-btn"
                onclick={handleFetchModels}
                disabled={fetchingModels || (currentProvider.requiresApiKey && !apiKey) || (currentProvider.requiresBaseUrl && !baseUrl)}
                title="Fetch available models"
              >
                {fetchingModels ? '🔄 Fetching...' : '🔄 Refresh Models'}
              </button>
            </div>
            {#if modelsError}
              <div class="models-error">
                ⚠️ {modelsError}
              </div>
            {/if}
            <select id="model" bind:value={selectedModel} disabled={fetchingModels || availableModels.length === 0}>
              {#if availableModels.length > 0}
                {#each availableModels as model}
                  <option value={model}>{model}</option>
                {/each}
              {:else}
                <option value="">No models available - click Refresh Models</option>
              {/if}
            </select>
            <p class="help-text">
              {#if fetchingModels}
                Fetching available models...
              {:else if modelsError}
                Please provide valid credentials and click "Refresh Models"
              {:else if availableModels.length > 0}
                {availableModels.length} model{availableModels.length !== 1 ? 's' : ''} available
              {:else if currentProvider.requiresApiKey && !apiKey}
                Enter API key and click "Refresh Models" to load available models
              {:else if currentProvider.requiresBaseUrl && !baseUrl}
                Enter base URL and click "Refresh Models" to load available models
              {:else}
                Click "Refresh Models" to fetch available models
              {/if}
            </p>
          </div>

          <div class="button-group">
            <button
              class="test-btn"
              onclick={handleTestConnection}
              disabled={testing || (currentProvider.requiresApiKey && !apiKey)}
            >
              {testing ? '🔄 Testing...' : '🧪 Test Connection'}
            </button>
          </div>

          {#if testResult}
            <div class="test-result {testResult.success ? 'success' : 'error'}">
              <strong>{testResult.success ? '✅ Success!' : '❌ Error:'}</strong>
              <p>{testResult.message}</p>
              {#if testResult.preview}
                <div class="preview">
                  <strong>Preview:</strong>
                  <p>"{testResult.preview}"</p>
                </div>
              {/if}
            </div>
          {/if}
        {/if}
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" onclick={handleClose}>Cancel</button>
        <button
          class="save-btn"
          onclick={handleSave}
          disabled={saving || !selectedProvider || (currentProvider?.requiresApiKey && !apiKey) || availableModels.length === 0 || !selectedModel}
        >
          {saving ? 'Saving...' : '💾 Save Settings'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px;
    border-bottom: 2px solid #f0f0f0;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.8em;
    color: #333;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 2em;
    color: #999;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .close-btn:hover {
    background: #f0f0f0;
    color: #333;
  }

  .modal-body {
    padding: 30px;
  }

  .form-group {
    margin-bottom: 25px;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    font-size: 1.1em;
  }

  .form-group select,
  .form-group input {
    width: 100%;
    padding: 12px 15px;
    font-size: 1em;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    transition: border-color 0.3s ease;
    font-family: inherit;
  }

  .form-group select:focus,
  .form-group input:focus {
    outline: none;
    border-color: #667eea;
  }

  .help-text {
    margin-top: 8px;
    font-size: 0.9em;
    color: #666;
    line-height: 1.4;
  }

  .help-text code {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    color: #d63384;
  }

  .button-group {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .model-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .model-header label {
    margin-bottom: 0;
  }

  .fetch-models-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 6px 15px;
    font-size: 0.85em;
    font-weight: 600;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .fetch-models-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }

  .fetch-models-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .models-error {
    background: #fff3cd;
    border: 2px solid #ffc107;
    color: #856404;
    padding: 10px 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    font-size: 0.9em;
    font-weight: 500;
  }

  .test-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 1em;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }

  .test-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }

  .test-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .test-result {
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
  }

  .test-result.success {
    background: #d4edda;
    border: 2px solid #28a745;
    color: #155724;
  }

  .test-result.error {
    background: #f8d7da;
    border: 2px solid #dc3545;
    color: #721c24;
  }

  .test-result strong {
    display: block;
    margin-bottom: 8px;
    font-size: 1.1em;
  }

  .test-result p {
    margin: 5px 0;
  }

  .preview {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .preview p {
    font-style: italic;
    margin-top: 5px;
  }

  .modal-footer {
    padding: 20px 30px;
    border-top: 2px solid #f0f0f0;
    display: flex;
    gap: 15px;
    justify-content: flex-end;
  }

  .cancel-btn,
  .save-btn {
    padding: 12px 30px;
    font-size: 1em;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .cancel-btn {
    background: #f0f0f0;
    color: #666;
  }

  .cancel-btn:hover {
    background: #e0e0e0;
  }

  .save-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .save-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }

  .save-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .modal-content {
      max-height: 95vh;
    }

    .modal-header {
      padding: 20px;
    }

    .modal-header h2 {
      font-size: 1.5em;
    }

    .modal-body {
      padding: 20px;
    }

    .modal-footer {
      flex-direction: column;
    }

    .cancel-btn,
    .save-btn {
      width: 100%;
    }
  }
</style>
