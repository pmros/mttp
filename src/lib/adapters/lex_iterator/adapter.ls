class LexerAdapter
  (@lexer) ->
  setStream: (input) ->
    @lexer.input = input
  (Symbol.iterator): ->*
    loop
      name = @lexer.lex!
      text = @lexer.yytext
      break if name is \EOF or name is undefined
      yield type: name, text: text

module.exports = LexerAdapter
