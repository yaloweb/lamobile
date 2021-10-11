module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  rules: {
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'prefer-const': 'off',
    'arrow-parens': 'off'
  }
}
