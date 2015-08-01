require! {
  './lexer'
  './lexer-adapter' : LexerAdapter
  './grammar'
  '../vendor/kappa': k
}

mylexer = new LexerAdapter lexer

container = k.parser.parser-creator.create grammar: grammar

process.stdin.set-encoding \utf8
process.stdin.on \readable ->
  input = process.stdin.read! ? ''

  mylexer.set-stream input

  parsing = container.parser.parse mylexer

  if parsing.error
    console.log 'Parser error.'
    process.exit 1
  else
    console.log parsing.current-value
    process.exit 0
