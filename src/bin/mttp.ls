``#!/usr/bin/env node``

compiler-name = if process.argv.2
  that - '--'
else
  'lex_kappa'

process.stdin.set-encoding \utf8
process.stdin.on \readable ~>
  input = process.stdin.read! ? ''

  Compiler = require "../lib/compilers/#{compiler-name}"
  compiler = new Compiler

  try
    output = compiler.compile input
    console.log output
    process.exit 0
  catch
    console.log 'Parser error.'
    process.exit 1
