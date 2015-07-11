#MTTP - My Tiny Toy Parser

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
node lib/parser.js < examples/numbers.txt
```

## Goals
- A parser that it can run at Node.js.
- Indent based syntax (so I choose this [lexer](https://github.com/aaditmshah/lexer) instead parser default lexer).
- Fun to code and easy to read (so I choosed LiveScript/[Kappa](https://github.com/Mictian/kappa) instead of Plain Javascript/Jison, for example).

## TODO
- Better error handling.
- Tests.
