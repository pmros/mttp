(function(){
  var lexer, LexerAdapter, grammar, k, mylexer, container;
  lexer = require('./lexer');
  LexerAdapter = require('./lexer-adapter');
  grammar = require('./grammar');
  k = require('../vendor/kappa');
  mylexer = new LexerAdapter(lexer);
  container = k.parser.parserCreator.create({
    grammar: grammar
  });
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function(){
    var input, ref$, parsing;
    input = (ref$ = process.stdin.read()) != null ? ref$ : '';
    mylexer.setStream(input);
    parsing = container.parser.parse(mylexer);
    if (parsing.error) {
      console.log('Parser error.');
      return process.exit(1);
    } else {
      console.log(parsing.currentValue);
      return process.exit(0);
    }
  });
}).call(this);
