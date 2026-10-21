// Deployment settings. Edit these for your organisation's deployment.
export const CONFIG = {
  // Who the notes are for. Shapes the wording of every note.
  clinicDescription: 'Bunurong Wildlife Care, a registered wildlife shelter in Inverloch, Victoria',
  // Production: set this to your deployed proxy (see /proxy). Staff then never handle API keys.
  // Leave empty to let each user paste their own Anthropic API key in Settings.
  proxyUrl: '',
  // Model used for notes. Sonnet balances accuracy and speed; Haiku is faster and cheaper.
  models: [
    { id: 'claude-sonnet-5-5', label: 'Accurate (Sonnet 5.5)' },
    { id: 'claude-haiku-5-5', label: 'Fast (Haiku 5.5)' },
  ],
  defaultModel: 'claude-sonnet-5-5',
  maxTokens: 4000,
  timeoutMs: 120000,
  speechLang: 'en-AU',
};
