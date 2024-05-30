const SUFFIXES = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
]);

export function ordinal(num: number): string {
  const rules = new Intl.PluralRules('en-US', { type: 'ordinal' });
  const rule = rules.select(num);
  const suffix = SUFFIXES.get(rule);
  return `${num}${suffix}`;
}
