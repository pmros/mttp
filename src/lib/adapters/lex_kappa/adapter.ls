require! '../../../vendor/kappa': k

class LexerAdapter
  (@lexer) ->
  setStream: (input)->
    @lexer.set-input input
  getNext: ->
    name = @lexer.lex!
    text = @lexer.yytext
    if name is \EOF or name is undefined
      {
        terminal: new k.data.Symbol name: k.data.specialSymbol.EOF
        length: -1
      }
    else
      {
        terminal: new k.data.Terminal name: name, body: ''
        string: text
      }

module.exports = LexerAdapter
