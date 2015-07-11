(function(){
  function walk(node){
    var ref$;
    switch (node != null && ((ref$ = node.rule) != null && ref$.name)) {
    case 'S1':
      return "[" + walk(node.nodes[0]) + "]";
    case 'C1':
      return walk(node.nodes[0]) + "" + walk(node.nodes[1]);
    case 'C2':
      return walk(node.nodes[0]) + "," + walk(node.nodes[1]) + walk(node.nodes[2]);
    case 'D1':
      return '';
    case 'D2':
      return ",[" + walk(node.nodes[1]) + "]";
    default:
      return node;
    }
  }
  module.exports = {
    walk: walk
  };
}).call(this);
