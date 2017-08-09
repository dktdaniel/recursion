// If life was easy, we could just do things the easy way:
// let getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
let getElementsByClassName = function(className) {
  function DOMtraverser(node) {
    let classMatches = [];
      // check if the node has any classes at all and if it does, if its class is a match
      if (node.classList && node.classList.contains(className)) {
        //child's class is a match, add it to classMatches array
        classMatches.push(node);
      }
      // check if the node has child nodes
      let children = node.childNodes;
      //if it does...
      if (typeof children !== undefined) {       
          //check each child if they match the target class
          //we can't use forEach because a node list is not an array
          for (let i = 0; i < children.length; i++) {
          // send each child back through the DOMtraverser
          // the classMatches array from this call is generated within a new scope so we need to concat it to the original
          classMatches = classMatches.concat(DOMtraverser(children[i]));
          }
      }
      return classMatches;        
   }
  //call DOMtraverser passing in document.body as the starting node
  return DOMtraverser(document.body);     
};