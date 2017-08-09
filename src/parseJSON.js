// this is what you would do if you were one to do things the easy way:
// let parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
let parseJSON = function(json) {

  let idx = 0;
  let curChar = ' ';
  let escapeChars = {
    '"':  '"',
    '\\': '\\',
    b:    '\b',
    f:    '\f',
    n:    '\n',
    r:    '\r',
    t:    '\t'
  };

  // gets next character
  let next = function(ch) {
    if (ch && ch !== curChar) throw new SyntaxError();
    curChar = json.charAt(idx);
    idx += 1;
    return curChar;
  };

  // removes whitespace
  let removeWhite = function() {
    while (curChar && curChar <= ' ') next();
  };

  // parses numbers
  let parseNumber = function() {
    let string = '';
    if (curChar === '-') {
      string = '-';
      next('-');
    }
    while (curChar >= '0' && curChar <= '9') {
      string += curChar;
      next();
    }
    if (curChar === '.') {
      string += '.';
      while (next() && curChar >= '0' && curChar <= '9') {
        string += curChar;
      }
    }
    if (curChar === 'e' || curChar === 'E') {
      string += curChar;
      next();
      if (curChar === '-' || curChar === '+') {
        string += curChar;
        next();
      }
      while (curChar >= '0' && curChar <= '9') {
        string += curChar;
        next();
      }
    }
    return Number(string);

  };

  // parses strings
	let parseString = function() {
		let string = '';
		//string should start with "
		if (curChar === '\"') {
			while (next()) {
			//watch for ending "
			if (curChar === '\"') {
				next();
				return string;
			}

			//watch for escapeChars
			if (curChar === '\\') {
				next();
				if (typeof escapeChars[curChar] === 'string') {
					string += escapeChars[curChar];
				} else {
					string += curChar;
				}
			} else {
				string += curChar;
				}
			}
		}
		throw new SyntaxError('Bad string');
	}

  // parses booleans and null
  let boolNull = function() {
		if (curChar === 't') {
			next('t');
			next('r');
			next('u');
			next('e')
			return true;
		} else if (curChar === 'f') {
			next('f');
			next('a');
			next('l');
			next('s');
			next('e');
			return false;
		} else if (curChar === 'n') {
			next('n');
			next('u');
			next('l');
			next('l');
			return null;
		}
		throw new SyntaxError('Unexpected character');
	};

  // parses arrays
  let parseArray = function() {
    let parseArray = [];
    if (curChar === '[') {
      next('[');
      removeWhite();
      if (curChar === ']') {
        next(']');
        return parseArray;
      }
      while (curChar) {
        parseArray.push(value());
        removeWhite();
        if (curChar === ']') {
          next(']');
          return parseArray;
        }
        next(',');
        removeWhite();
      }
    }
    throw new SyntaxError("array");
  };

  // parses objects
  let parseObject = function() {
    let key;
    let object = {};
    if (curChar === '{') {
      next('{');
      removeWhite();
      if (curChar === '}') {
        next('}');
        return object;
      }
      while (curChar) {
        key = parseString();
        removeWhite();
        next(':');
        object[key] = value();
        removeWhite();
        if (curChar === '}') {
          next('}');
          return object;
        }
        next(',');
        removeWhite();
      }
    }
    throw new SyntaxError("object");
  };


  let value = function() {
		removeWhite();
		if (curChar === '{') {
			return parseObject();
		} else if (curChar === '[') {
			return parseArray();
		} else if (curChar === '"') {
			return parseString();
		} else if (curChar === '-' || (curChar >= '0' && curChar <= '9')) {
			return parseNumber();
		} else {
			return boolNull();
		}
	};

  return value();
};
