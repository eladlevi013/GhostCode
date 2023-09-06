start = _ e:expressions eoi { return e; }

expressions = e:e { return e; }

exp = additiveExp

additiveExp
  = left:multiplicativeExp _ "+" _ right:additiveExp { return { type: 'binaryOp', operator: '+', left, right }; }
  / left:multiplicativeExp _ "-" _ right:additiveExp { return { type: 'binaryOp', operator: '-', left, right }; }
  / multiplicativeExp

multiplicativeExp
  = left:primaryExp _ "*" _ right:multiplicativeExp { return { type: 'binaryOp', operator: '*', left, right }; }
  / left:primaryExp _ "/" _ right:multiplicativeExp { return { type: 'binaryOp', operator: '/', left, right }; }
  / left:primaryExp _ "%" _ right:multiplicativeExp { return { type: 'binaryOp', operator: '%', left, right }; }
  / primaryExp

primaryExp
  = "(" _ exp:exp _ ")" { return exp; }
  / NUMBER

e = "ghosts" "[" _ ghostId:exp _ "]" _ "." _ statement:e
  { return { type: 'ghosts', ghostId, statement }; }
  / "mouse" "[" _ ghostId:exp _ "]" _ "." _ statement:e
  { return { type: 'mouse', ghostId, statement }; }
  / "fish" "." _ "step" _ "(" _ value:exp _ ")" _ next:e
  { return { type: 'fish', value, next }; }
  / statement
  / loopExp
  / "" { return null; }

statement = "step" _ "(" _ value:exp _ ")" _ next:e
  { return { type: 'step', valueType: 'number', value, next }; }
  / "turn" _ "(" _ value:exp _ ")" _ next:e
  { return { type: 'turn', value, next }; }
  / "{" _ e:e _ "}" _ next:e { return { type: 'block', statements: e }; }

loopExp
  = "loop" _ "(" _ count:NUMBER _ ")" _ ":" _ id:ID _ "{" _ body:e _ "}" _ next:e
    { return { type: 'loopVar', value: count, var: id, body, next }; }
  / "loop" _ "(" _ count:NUMBER _ ")" _ "{" _ body:e _ "}" _ next:e
    { return { type: 'loop', value: count, body, next }; }

eoi = !.

NUMBER = "-"? [0-9]+ ("." [0-9]+)? { return text(); }
ID = [a-zA-Z]+

_ = [ \t\n\r]* // Optional whitespace and newline characters
