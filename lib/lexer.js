(function(){
  var Lexer, indent, lexer;
  Lexer = require('lex');
  indent = [0];
  lexer = new Lexer(function(c){
    throw new Error("Lexer error at character '" + c + "'");
  });
  lexer.addRule(/\n+/, function(){}).addRule(/^ */gm, function(lexeme){
    var indentation, tokens;
    indentation = lexeme.length;
    if (indentation > indent[0]) {
      indent.unshift(indentation);
      return 'INDENT';
    }
    tokens = [];
    while (indentation < indent[0]) {
      tokens.push('DEDENT');
      indent.shift();
    }
    if (tokens.length) {
      return tokens;
    }
  }).addRule(/\d+/, function(lexeme){
    this.yytext = lexeme;
    return 'NUMBER';
  });
  module.exports = lexer;
}).call(this);
