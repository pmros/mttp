(function(){
  var k, grammar, rule, nonTerminal, terminal, number, indent, dedent, C, D, empty;
  k = require('../vendor/kappa');
  grammar = function(rules){
    return new k.data.Grammar({
      rules: rules,
      startSymbol: rules[0].head
    });
  };
  rule = function(name, opts){
    return new k.data.Rule({
      name: name,
      head: opts.head,
      tail: opts.tail
    });
  };
  nonTerminal = function(name){
    return new k.data.NonTerminal({
      name: name
    });
  };
  terminal = function(name){
    return new k.data.Terminal({
      name: name,
      body: ''
    });
  };
  number = terminal('NUMBER');
  indent = terminal('INDENT');
  dedent = terminal('DEDENT');
  C = nonTerminal('C');
  D = nonTerminal('D');
  empty = new k.data.Symbol({
    name: k.data.specialSymbol.EMPTY
  });
  /*
  S -> C
  
  C -> number D
  C -> C number D
  
  D -> empty
  D -> indent C dedent
  */
  module.exports = grammar([
    rule('S1', {
      head: 'S',
      tail: [C]
    }), rule('C1', {
      head: 'C',
      tail: [number, D]
    }), rule('C2', {
      head: 'C',
      tail: [C, number, D]
    }), rule('D1', {
      head: 'D',
      tail: [empty]
    }), rule('D2', {
      head: 'D',
      tail: [indent, C, dedent]
    })
  ]);
}).call(this);
