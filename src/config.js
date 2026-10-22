// Deployment settings. Edit these for your organisation's deployment.
export const CONFIG = {
  // Who the notes are for. Shapes the wording of every note.
  clinicDescription: 'Bunurong Wildlife Care, a registered wildlife shelter in Inverloch, Victoria',
  // Production: set this to your deployed proxy (see /proxy). Staff then never handle API keys.
  // Leave empty to let each user paste their own Anthropic API key in Settings.
  proxyUrl: 'https://care-scribe-proxy.ashley-98e.workers.dev',
  // Model used for notes. Sonnet is the default; Opus is the most thorough; Haiku is fastest and cheapest.
  // tier is what the Claude app uses if the named model isn't available. Prices are USD per million tokens
  // (input, output) from platform.claude.com/docs/en/about-claude/pricing, checked October 2026.
  models: [
    { id: 'claude-sonnet-5-5', label: 'Accurate (Sonnet 5.5), recommended', tier: 'default', price: [2, 10] },
    { id: 'claude-opus-5-5', label: 'Most thorough (Opus 5.5), slower and about 2x the cost', tier: 'complex', price: [4, 20] },
    { id: 'claude-haiku-5-5', label: 'Fast (Haiku 5.5), cheapest', tier: 'quick', price: [0.1, 0.5] },
  ],
  defaultModel: 'claude-sonnet-5-5',
  maxTokens: 8000, // intake plus care plan in one reply
  timeoutMs: 120000,
  speechLang: 'en-AU',
};
