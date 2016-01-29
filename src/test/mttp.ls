require! fs

test = it
describe 'mttp' !->
  input = expected-output = null
  before-all !->
    input  := fs.read-file-sync "#{__dirname}/input", \utf8 .trim!
    expected-output := fs.read-file-sync "#{__dirname}/output", \utf8 .trim!

  dir = "#{__dirname}/../lib/compilers"
  fs.readdir-sync dir .for-each (filename) ->
    test "#{filename - '.js'} compiler can compile input file correctly" !->
      Compiler = require "#{dir}/#{filename}"
      compiler = new Compiler
      output = compiler.compile input
      expect output .to-be expected-output
