class Node {
    constructor(type, left = null, right = null, value = null) {
      this.type = type;  // 'operator' or 'operand'
      this.left = left;  // Left child for operators
      this.right = right; // Right child for operators
      this.value = value; // Only applicable for operands
    }
  }
  
  module.exports = Node;
  