class LexerAdapter
  (@lexer) ->
  setStream: (input) ->
    @lexer.set-input input
  (Symbol.iterator): ->*
    loop
      name = @lexer.lex!
      text = @lexer.yytext
      break if name is \EOF or name is undefined
      yield type: name, text: text

module.exports = LexerAdapter
