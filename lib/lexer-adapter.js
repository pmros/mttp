(function(){
  var k, LexerAdapter;
  k = require('../vendor/kappa');
  LexerAdapter = (function(){
    LexerAdapter.displayName = 'LexerAdapter';
    var prototype = LexerAdapter.prototype, constructor = LexerAdapter;
    function LexerAdapter(lexer){
      this.lexer = lexer;
    }
    prototype.setStream = function(input){
      return this.lexer.input = input;
    };
    prototype.getNext = function(){
      var name, text;
      name = this.lexer.lex();
      text = this.lexer.yytext;
      if (name === 'EOF' || name === undefined) {
        return {
          terminal: new k.data.Symbol({
            name: k.data.specialSymbol.EOF
          }),
          length: -1
        };
      } else {
        return {
          terminal: new k.data.Terminal({
            name: name,
            body: ''
          }),
          string: text
        };
      }
    };
    return LexerAdapter;
  }());
  module.exports = LexerAdapter;
}).call(this);
