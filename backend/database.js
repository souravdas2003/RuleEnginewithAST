const fs = require('fs');
const path = require('path');

const ruleFile = path.join(__dirname, '../data/rules.json');

function saveRule(rule, ruleName) {
  const rules = JSON.parse(fs.readFileSync(ruleFile, 'utf-8'));
  rules[ruleName] = rule;
  fs.writeFileSync(ruleFile, JSON.stringify(rules, null, 2));
}

function getRules() {
  return JSON.parse(fs.readFileSync(ruleFile, 'utf-8'));
}

module.exports = {
  saveRule,
  getRules,
};
