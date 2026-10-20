import { EXAMPLE_NOTE } from '../src/note.js';

export const SAMPLE_NOTE = EXAMPLE_NOTE;

/** An Anthropic Messages API response body wrapping a note. */
export const apiReply = (note = SAMPLE_NOTE) => ({
  id: 'msg_test',
  type: 'message',
  role: 'assistant',
  model: 'claude-sonnet-5-5',
  stop_reason: 'end_turn',
  content: [{ type: 'text', text: '```json\n' + JSON.stringify(note) + '\n```' }],
});
