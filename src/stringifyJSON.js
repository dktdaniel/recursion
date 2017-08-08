// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here

  //null
  if (obj === null) {
    return "null";
  }

  //booleans
  else if (obj.constructor === Boolean) {
  	return !!obj + '';
  }

  //strings
  else if (obj.constructor === String) {
    return '\"' + obj + '\"';
  }

  //numbers
  else if (obj.constructor === Number) {
  	return obj + '';
  }

  //arrays
  else if (obj.constructor === Array) {
  	if (!obj) {
  	  return '[]';
  	}
  	return '[' + obj.reduce((acc, cur) => {
  	  if (cur === undefined) {
  	    return [...acc];
  	  } else {
  	  	return [...acc, stringifyJSON(cur)];
  	  }
  	}, []).join(',') + ']';
  }
  
  //objects
  else if (obj.constructor === Object) {
    return '{' + Object.keys(obj).reduce((acc, cur) => {
      //skip key value pairs that are undefined or functions
      if (obj[cur] === undefined || typeof obj[cur] === 'function') {
        return acc;
      } else {
      	return [...acc, stringifyJSON(cur) + ':' + stringifyJSON(obj[cur])]
      }
    }, []).join(',') + '}';
  }

  else {
  	return {};
  }
    

};
