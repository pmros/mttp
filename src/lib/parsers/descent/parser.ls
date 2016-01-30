class Tokenizer
  (@iterator) ->
    @buffer = []
  next: ~>
    {value: token, done} = @iterator.next!
    if done
      { type: \EOF, text: '' }
    else
      token
  lookAhead: (distance=0) ~>
    while distance >= @buffer.length
      @buffer.push @next!
    @buffer[distance]
  consume: ~>
    @look-ahead!
    result = @buffer.pop!
    #console.log result
    result
  match: (expected) ~>
    token = @look-ahead!
    return false if token.type isnt expected
    @consume!
    true

class Parser
  (@lexer) ->
  parseItem: (tokenizer) ->
    token = tokenizer.look-ahead!
    switch token.type
      | \NUMBER => @parse-number tokenizer
      | \INDENT => @parse-block tokenizer
  parseItems: (tokenizer) ->
    output = @parse-item tokenizer
    token = tokenizer.look-ahead!
    until token.type in <[ EOF DEDENT ]>
      output += ",#{@parse-item tokenizer}"
      token = tokenizer.look-ahead!
    output
  parseNumber: (tokenizer) ->
    token = tokenizer.consume!
    token.text
  parseBlock: (tokenizer) ->
    token = tokenizer.consume!
    output = @parse-items tokenizer
    throw new SyntaxError unless tokenizer.match \DEDENT
    "[#{output}]"
  parse: (input) ->
    @lexer.set-stream input
    tokenizer = new Tokenizer(@lexer[Symbol.iterator]!)
    output = @parse-items tokenizer
    throw new SyntaxError unless tokenizer.match \EOF
    "[#{output}]"


module.exports = Parser
