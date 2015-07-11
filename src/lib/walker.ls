function walk node
  switch node?rule?name
  | \S1 => "[#{walk node.nodes.0}]"
  | \C1 => "#{walk node.nodes.0}#{walk node.nodes.1}"
  | \C2 => "#{walk node.nodes.0},#{walk node.nodes.1}#{walk node.nodes.2}"
  | \D1 => ''
  | \D2 => ",[#{walk node.nodes.1}]"
  | _ => node

module.exports = walk: walk
