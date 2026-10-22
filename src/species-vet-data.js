import { MAMMAL_POINTS } from './species-vet-mammals.js';
import { BIRD_REPTILE_POINTS } from './species-vet-birds.js';
import { QLD_BIRD_POINTS } from './species-vet-birds-qld.js';
import { EXTRA_POINTS } from './species-vet-extra.js';

export const VET_POINTS = [...MAMMAL_POINTS, ...BIRD_REPTILE_POINTS, ...QLD_BIRD_POINTS, ...EXTRA_POINTS];
