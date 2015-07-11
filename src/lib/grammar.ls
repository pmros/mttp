require! '../vendor/kappa': k

/*
S -> C

C -> NUMBER D
C -> C NUMBER D

D -> EMPTY
D -> INDENT C DEDENT
*/

S1 = new k.data.Rule do
  head: \S
  tail:
    new k.data.NonTerminal name: \C
    ...
  name: \S1

C1 = new k.data.Rule do
  head: \C
  tail:
    new k.data.Terminal name: \NUMBER body: ''
    new k.data.NonTerminal name: \D
  name: \C1

C2 = new k.data.Rule do
  head: \C
  tail:
    new k.data.NonTerminal name: \C
    new k.data.Terminal name: \NUMBER body: ''
    new k.data.NonTerminal name: \D
  name: \C2

D1 = new k.data.Rule do
  head: \D
  tail:
    new k.data.Symbol name: k.data.specialSymbol.EMPTY
    ...
  name: \D1

D2 = new k.data.Rule do
  head: \D
  tail:
    new k.data.Terminal name: \INDENT body: ''
    new k.data.NonTerminal name: \C
    new k.data.Terminal name: \DEDENT body: ''
  name: \D2

module.exports = new k.data.Grammar do
  startSymbol: S1.head
  rules: [ S1, C1, C2, D1, D2 ]
