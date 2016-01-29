require! lex: Lexer

indent = [0]

lexer = new Lexer (c) ->
  throw new Error "Lexer error at character '#c'"

lexer
  .add-rule /\n+/ ->
  .add-rule /^ */gm (lexeme) ->
    indentation = lexeme.length

    if indentation > indent.0
      indent.unshift indentation
      return \INDENT

    tokens = []

    while indentation < indent.0
      tokens.push \DEDENT
      indent.shift!

    tokens if tokens.length
  .add-rule /\d+/ (lexeme) ->
    @yytext = lexeme
    \NUMBER

module.exports = lexer
