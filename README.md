# MTTP - My Tiny Toy Parser

## What is MTTP?
MTTP is a parser that takes an input like this:
```
1
2
  21
    211
  22
    221
    222
3
```
and it gives you this output:
```
[1,2,[21,[211],22,[221,222]],3]
```

## Why MTTP?
Just for fun and learning. Maybe this little project could help me to write someday a real parser that compiles my own language to Javascript. Maybe it helps someone else.

## How can I use MTTP?
```
git clone https://github.com/pmros/mttp.git
cd mttp
npm install
./bin/mttp < test/input
./bin/mttp --lex_descent < test/input
```

## How does MTTP work?
MTTP tries different implementations of lexers/parsers for the same grammar. Currently there is two implementations:

* Lex/Kappa compiler:
  - Lexer: a lexer called [lexer](https://github.com/aaditmshah/lexer).
  - Adapter: it just adapts lexer tokens (flex/bison style) to expected Kappa tokens.
  - Parser: [Kappa](https://github.com/Mictian/kappa), a nice LALR parser.

* Lex/Descent compiler:
  - Lexer: lexer.
  - Adapter: lex (ES6) iterator adapter.
  - Parser: Handwritten recursive descent parser.

## Goals
- A parser that it can run at Node.js.
- Indent based syntax.
- Fun to code and easy to read.
- Try different implementations of the same parser.
- Testable.

## TODO
- More parser implementations.
