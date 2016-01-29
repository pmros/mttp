require! {
  '../lexers/lex/lexer'
  '../adapters/lex_kappa/adapter' : Adapter
  '../parsers/kappa/parser': Parser
}

class Compiler
  ->
    @lexer = new Adapter lexer
    @parser = new Parser @lexer
  compile: (input) ->
    @parser.parse input

module.exports = Compiler
