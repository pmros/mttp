class Parser
  (@lexer) ->
  parse: (input) ->
    @lexer.set-stream input
    tokens = Array.from @lexer
    tokens
      .map -> "#{it.type}(#{it.text})"
      .join!

module.exports = Parser
