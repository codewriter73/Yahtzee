module.exports = {
  '*.{js,jsx,ts,tsx,css}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'tsc --noEmit --pretty',
};
