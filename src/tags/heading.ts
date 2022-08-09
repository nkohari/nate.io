import { generateId } from '../../build/mutators';

export default {
  node: 'heading',
  render: 'Heading',
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
  },
  mutators: [generateId],
};
