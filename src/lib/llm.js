/**
 * LLM Provider integrations for generating Claude Code facts
 */

import { getConfig } from './db.js';

/**
 * Available LLM providers
 */
export const PROVIDERS = [
  {
    id: 'openai',
    name: 'OpenAI',
    requiresApiKey: true,
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4o-mini'
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    requiresApiKey: true,
    models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
    defaultModel: 'claude-3-5-haiku-20241022'
  },
  {
    id: 'google',
    name: 'Google Gemini',
    requiresApiKey: true,
    models: ['gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    defaultModel: 'gemini-2.0-flash-exp'
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    requiresApiKey: true,
    models: ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest'],
    defaultModel: 'mistral-small-latest'
  },
  {
    id: 'ollama',
    name: 'Ollama (Local)',
    requiresApiKey: false,
    requiresBaseUrl: true,
    models: ['llama3.2', 'llama3.1', 'mistral', 'phi3', 'gemma2'],
    defaultModel: 'llama3.2',
    defaultBaseUrl: 'http://localhost:11434'
  }
];

/**
 * System prompt for generating Claude Code facts
 */
const SYSTEM_PROMPT = `You are a creative writer specializing in Chuck Norris-style jokes. Generate a single Chuck Norris-style fact about "Claude Code" (an AI coding assistant).

Rules:
- Make it humorous and exaggerated
- Follow the Chuck Norris joke format (e.g., "Claude Code doesn't X, Y does X")
- Keep it programming/coding related
- Keep it under 150 characters
- Be creative and original
- Don't include quotes or extra formatting
- Just return the fact text, nothing else`;

/**
 * Generate a fact using OpenAI API
 */
async function generateWithOpenAI(apiKey, model) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: 'Generate one Claude Code fact.' }
      ],
      temperature: 0.9,
      max_tokens: 150
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

/**
 * Generate a fact using Anthropic API
 */
async function generateWithAnthropic(apiKey, model) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: model || 'claude-3-5-haiku-20241022',
      max_tokens: 150,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: 'Generate one Claude Code fact.' }
      ],
      temperature: 0.9
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Anthropic API request failed');
  }

  const data = await response.json();
  return data.content[0].text.trim();
}

/**
 * Generate a fact using Google Gemini API
 */
async function generateWithGoogle(apiKey, model) {
  const modelName = model || 'gemini-2.0-flash-exp';
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: SYSTEM_PROMPT + '\n\nGenerate one Claude Code fact.'
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 150
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Google API request failed');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text.trim();
}

/**
 * Generate a fact using Mistral AI API
 */
async function generateWithMistral(apiKey, model) {
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'mistral-small-latest',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: 'Generate one Claude Code fact.' }
      ],
      temperature: 0.9,
      max_tokens: 150
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Mistral API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

/**
 * Generate a fact using Ollama (local)
 */
async function generateWithOllama(baseUrl, model) {
  const url = `${baseUrl}/api/generate`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model || 'llama3.2',
      prompt: SYSTEM_PROMPT + '\n\nGenerate one Claude Code fact.',
      stream: false,
      options: {
        temperature: 0.9,
        num_predict: 150
      }
    })
  });

  if (!response.ok) {
    throw new Error('Ollama API request failed. Make sure Ollama is running.');
  }

  const data = await response.json();
  return data.response.trim();
}

/**
 * Generate a Claude Code fact using the configured provider
 */
export async function generateFact() {
  const provider = await getConfig('selectedProvider');
  const apiKey = await getConfig('apiKey');
  const baseUrl = await getConfig('baseUrl');
  const model = await getConfig('selectedModel');

  if (!provider) {
    throw new Error('No LLM provider configured. Please configure a provider in settings.');
  }

  const providerInfo = PROVIDERS.find(p => p.id === provider);
  if (!providerInfo) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  if (providerInfo.requiresApiKey && !apiKey) {
    throw new Error(`API key required for ${providerInfo.name}`);
  }

  if (providerInfo.requiresBaseUrl && !baseUrl) {
    throw new Error(`Base URL required for ${providerInfo.name}`);
  }

  let factText;
  switch (provider) {
    case 'openai':
      factText = await generateWithOpenAI(apiKey, model);
      break;
    case 'anthropic':
      factText = await generateWithAnthropic(apiKey, model);
      break;
    case 'google':
      factText = await generateWithGoogle(apiKey, model);
      break;
    case 'mistral':
      factText = await generateWithMistral(apiKey, model);
      break;
    case 'ollama':
      factText = await generateWithOllama(baseUrl, model);
      break;
    default:
      throw new Error(`Provider ${provider} not implemented`);
  }

  return factText;
}

/**
 * Fetch available models from Ollama
 */
export async function fetchOllamaModels(baseUrl) {
  try {
    const url = `${baseUrl}/api/tags`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Ollama models. Make sure Ollama is running.');
    }
    
    const data = await response.json();
    return data.models.map(model => model.name);
  } catch (error) {
    throw new Error(`Failed to fetch Ollama models: ${error.message}`);
  }
}

/**
 * Fetch available models from OpenAI
 */
export async function fetchOpenAIModels(apiKey) {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch OpenAI models');
    }
    
    const data = await response.json();
    // Filter for chat models only
    const chatModels = data.data
      .filter(model => model.id.includes('gpt'))
      .map(model => model.id)
      .sort()
      .reverse();
    
    return chatModels.length > 0 ? chatModels : ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'];
  } catch (error) {
    // Return default models if fetch fails
    return ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'];
  }
}

/**
 * Fetch available models from Anthropic
 */
export async function fetchAnthropicModels(apiKey) {
  // Anthropic doesn't have a models list endpoint, so return the known models
  return ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'];
}

/**
 * Fetch available models from Google
 */
export async function fetchGoogleModels(apiKey) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Google models');
    }
    
    const data = await response.json();
    const models = data.models
      .filter(model => model.supportedGenerationMethods?.includes('generateContent'))
      .map(model => model.name.replace('models/', ''))
      .filter(name => name.includes('gemini'));
    
    return models.length > 0 ? models : ['gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash'];
  } catch (error) {
    // Return default models if fetch fails
    return ['gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash'];
  }
}

/**
 * Fetch available models from Mistral
 */
export async function fetchMistralModels(apiKey) {
  try {
    const response = await fetch('https://api.mistral.ai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Mistral models');
    }
    
    const data = await response.json();
    const models = data.data.map(model => model.id);
    
    return models.length > 0 ? models : ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest'];
  } catch (error) {
    // Return default models if fetch fails
    return ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest'];
  }
}

/**
 * Fetch available models from a provider
 */
export async function fetchModels(providerId, apiKey, baseUrl) {
  switch (providerId) {
    case 'openai':
      return await fetchOpenAIModels(apiKey);
    case 'anthropic':
      return await fetchAnthropicModels(apiKey);
    case 'google':
      return await fetchGoogleModels(apiKey);
    case 'mistral':
      return await fetchMistralModels(apiKey);
    case 'ollama':
      return await fetchOllamaModels(baseUrl || 'http://localhost:11434');
    default:
      throw new Error(`Unknown provider: ${providerId}`);
  }
}

/**
 * Test connection to the configured provider
 */
export async function testConnection(providerId, apiKey, baseUrl, model) {
  const providerInfo = PROVIDERS.find(p => p.id === providerId);
  if (!providerInfo) {
    throw new Error(`Unknown provider: ${providerId}`);
  }

  try {
    let result;
    switch (providerId) {
      case 'openai':
        result = await generateWithOpenAI(apiKey, model);
        break;
      case 'anthropic':
        result = await generateWithAnthropic(apiKey, model);
        break;
      case 'google':
        result = await generateWithGoogle(apiKey, model);
        break;
      case 'mistral':
        result = await generateWithMistral(apiKey, model);
        break;
      case 'ollama':
        result = await generateWithOllama(baseUrl, model);
        break;
      default:
        throw new Error(`Provider ${providerId} not implemented`);
    }
    return { success: true, message: 'Connection successful!', preview: result };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
