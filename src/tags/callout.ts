export default {
  tag: 'callout',
  render: 'Callout',
  attributes: {
    type: { type: String, matches: ['info', 'warning'], default: 'info' },
  },
};
