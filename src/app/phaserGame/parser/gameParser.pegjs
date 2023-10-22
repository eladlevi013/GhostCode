start
  = e:expressions eoi { return e; }

expressions
  = e:e { return e; }

e
  = type:("ghosts" / "mice") "[" _ index:exp _ "]" _ "." _ statement:e
    { return {type:'array', playerType:type, index, statement }; }
  / playerName:identifier  "."  statement:e
    { return { type: 'playerId', playerName, statement }; }
  / statement
  / loopExp
  / "" { return null; }

statement
  = action:("step" / "turn") _ "(" _ value:exp _ ")" _ next:e
    { return { type: action, value, next }; }
  / "{" _ e:e _ "}" _ next:e 
    { return { type: 'block', statements: e, next }; }

exp
  = additiveExp

additiveExp
  = left:multiplicativeExp _ "+" _ right:additiveExp
    { return { type: 'binaryOp', operator: '+', left, right }; }
  / left:multiplicativeExp _ "-" _ right:additiveExp
    { return { type: 'binaryOp', operator: '-', left, right }; }
  / multiplicativeExp

multiplicativeExp
  = left:primaryExp _ "*" _ right:multiplicativeExp
    { return { type: 'binaryOp', operator: '*', left, right }; }
  / left:primaryExp _ "/" _ right:multiplicativeExp
    { return { type: 'binaryOp', operator: '/', left, right }; }
  / left:primaryExp _ "%" _ right:multiplicativeExp
    { return { type: 'binaryOp', operator: '%', left, right }; }
  / primaryExp

primaryExp
  = number:number
    { return { type: 'number', value: parseFloat(number) }; }
  / identifier:identifier 
    { return { type: 'identifier', value: identifier }; }
  / "(" _ exp:exp _ ")" { return exp; }

loopExp
  = "loop" _ "(" _ count:number _ ")" _ optId:( ":" id:identifier { return id; } )? _ "{" _ body:e _ "}" _ next:e {
    var type = optId ? 'loopVar' : 'loop';
    var variableId = optId || null;
    return { type: type, count: parseFloat(count), variableId, body, next };
  }

eoi
  = !.

// lexical regular expressions
number = "-"? [0-9]+ ("." [0-9]+)? { return text(); }
identifier = [a-zA-Z]+
_ = [ \t\n\r]* // Optional whitespace and newline characters