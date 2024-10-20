const Node = require('./ast');

class RuleEngine {

  // Parses rule string into AST
  createRule(ruleString) {
    const tokens = this.tokenize(ruleString);
    const root = this.parseTokens(tokens);
    return root;
  }

  // Tokenize the input string
  tokenize(ruleString) {
    return ruleString.match(/\w+|[><=!]+|[()]/g);
  }

  // Parses the tokens to build AST
  parseTokens(tokens) {
    const stack = [];
    let current = null;

    for (let token of tokens) {
      if (token === '(') {
        stack.push(current);
        current = null;
      } else if (token === ')') {
        let node = current;
        current = stack.pop();
        if (current) {
          if (!current.left) current.left = node;
          else current.right = node;
        } else {
          current = node;
        }
      } else if (token === 'AND' || token === 'OR') {
        let newNode = new Node('operator', current, null, token);
        current = newNode;
      } else {
        let newNode = new Node('operand', null, null, token);
        if (!current) current = newNode;
        else if (!current.left) current.left = newNode;
        else current.right = newNode;
      }
    }
    return current;
  }

  // Evaluates the AST with the data provided
  evaluateRule(ast, data) {
    if (ast.type === 'operand') {
      return this.evaluateOperand(ast.value, data);
    } else {
      const leftResult = this.evaluateRule(ast.left, data);
      const rightResult = this.evaluateRule(ast.right, data);
      return this.evaluateOperator(ast.value, leftResult, rightResult);
    }
  }

  evaluateOperand(operand, data) {
    const [key, operator, value] = operand.split(' ');

    switch (operator) {
      case '>': return data[key] > parseFloat(value);
      case '<': return data[key] < parseFloat(value);
      case '=': return data[key] === value.replace(/'/g, '');
      default: return false;
    }
  }

  evaluateOperator(operator, leftResult, rightResult) {
    if (operator === 'AND') return leftResult && rightResult;
    if (operator === 'OR') return leftResult || rightResult;
    return false;
  }

  // Combines two or more ASTs into a single one
  combineRules(rules) {
    let combinedAST = rules[0];

    for (let i = 1; i < rules.length; i++) {
      combinedAST = new Node('operator', combinedAST, rules[i], 'AND');
    }

    return combinedAST;
  }
}

module.exports = RuleEngine;
