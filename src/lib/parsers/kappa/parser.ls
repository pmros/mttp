require! {
  './grammar'
  '../../../vendor/kappa': k
}

class Parser
  (@lexer) ->
  parse: (input) ->
    @lexer.set-stream input
    container = k.parser.parser-creator.create grammar: grammar
    parsing = container.parser.parse @lexer
    throw new SyntaxError(parsing.description) if parsing.error
    parsing.current-value

module.exports = Parser
