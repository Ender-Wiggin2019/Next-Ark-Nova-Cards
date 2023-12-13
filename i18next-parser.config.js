module.exports = {
  locales: ['en', 'zh-CN', 'de'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.ts', 'src/**/*.tsx'],
  keySeparator: false, // if your keys are like: 'app.name'
  useKeysAsDefaultValue: true, // uses the parsed value as defaultValue
  verbose: false, // logs info level messages when parsing
};
