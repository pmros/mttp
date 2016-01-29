require! {
  '../lexers/lex/lexer'
  '../adapters/lex_iterator/adapter' : Adapter
  '../parsers/descendant/parser': Parser
}

class Compiler
  ->
    @lexer = new Adapter lexer
    @parser = new Parser @lexer
  compile: (input) ->
    @parser.parse input

module.exports = Compiler
