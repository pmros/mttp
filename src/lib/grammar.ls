require! '../vendor/kappa': k

grammar = (rules) -> new k.data.Grammar { rules, startSymbol: rules.0.head }
rule = (name, opts) -> new k.data.Rule { name, opts.head, opts.tail }
non-terminal = (name) -> new k.data.NonTerminal { name }
terminal = (name) -> new k.data.Terminal { name, body: '' }

# terminal
number = terminal \NUMBER
indent = terminal \INDENT
dedent = terminal \DEDENT

# non-terminal
C = non-terminal \C
D = non-terminal \D

# special symbols
empty = new k.data.Symbol name: k.data.specialSymbol.EMPTY

/*
S -> C

C -> number D
C -> C number D

D -> empty
D -> indent C dedent
*/

module.exports = grammar do
  * rule \S1 head: \S tail: [ C ]

    rule \C1 head: \C tail: [ number, D ]
    rule \C2 head: \C tail: [ C, number, D ]

    rule \D1 head: \D tail: [ empty ]
    rule \D2 head: \D tail: [ indent, C, dedent ]
