export const SAMPLE_NOTE = {
  patient: {
    name: 'Rusty', species: 'Canine', breed: 'Kelpie cross', sex: 'Male entire', age: 'Approx. 3 years (dental estimate)',
    weight_kg: '14.2', microchip: 'Scanned, none detected', animal_id: 'QS-48213', intake_type: 'Stray (inspectorate)',
  },
  visit: { type: 'Intake consult', clinician: '' },
  subjective: 'Stray presented by inspector. Found wandering on highway with left forelimb lameness. No known owner.',
  objective: {
    vitals: { temp_c: '39.4', hr_bpm: '120', rr_bpm: '30', bcs: '3/9', mm_crt: 'Pink, tacky, CRT <2 s', hydration: '~5% dehydrated' },
    findings: ['Bright, alert, mildly anxious', '4 cm laceration, lateral left forelimb, est. 24-48 h old', 'Heavy flea burden'],
  },
  assessment: { problems: ['Laceration, left forelimb', 'Underweight (BCS 3/9)', 'Mild dehydration (~5%)', 'Flea infestation'], differentials: [] },
  plan: {
    procedures: ['Sedation (dexmedetomidine), clip and lavage, lignocaine local, primary closure'],
    diagnostics: [],
    treatments: [
      { drug: 'Cephalexin', dose: '22 mg/kg', route: 'PO', frequency: 'BID', duration: '7 days' },
      { drug: 'Meloxicam', dose: '0.1 mg/kg', route: 'PO', frequency: 'SID', duration: '5 days' },
      { drug: 'Fluralaner (Bravecto)', dose: 'Per label', route: 'PO', frequency: 'Once', duration: '' },
    ],
    follow_up: ['Recheck and suture removal in 10-14 days', 'Hold for stray period'],
  },
  welfare_notes: '',
  check: ['Clinician name not stated', 'Meloxicam started while ~5% dehydrated: confirm hydration plan'],
};

/** An Anthropic Messages API response body wrapping a note. */
export const apiReply = (note = SAMPLE_NOTE) => ({
  id: 'msg_test',
  type: 'message',
  role: 'assistant',
  model: 'claude-sonnet-5-5',
  stop_reason: 'end_turn',
  content: [{ type: 'text', text: '```json\n' + JSON.stringify(note) + '\n```' }],
});
