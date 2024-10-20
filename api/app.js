const express = require('express');
const path = require('path');
const RuleEngine = require('../backend/ruleEngine');
const { saveRule, getRules } = require('../backend/database');

const app = express();
const ruleEngine = new RuleEngine();

// Middleware to serve static files from the UI folder
app.use(express.static(path.join(__dirname, '../ui')));

app.use(express.json());

// Route to create a new rule
app.post('/create_rule', (req, res) => {
  const { ruleString, ruleName } = req.body;
  const ruleAST = ruleEngine.createRule(ruleString);
  saveRule(ruleAST, ruleName);
  res.json({ message: 'Rule created successfully!' });
});

// Route to evaluate rule
app.post('/evaluate_rule', (req, res) => {
  const { ruleName, data } = req.body;
  const rules = getRules();
  const ruleAST = rules[ruleName];
  const result = ruleEngine.evaluateRule(ruleAST, data);
  res.json({ result });
});

// Route to combine multiple rules
app.post('/combine_rules', (req, res) => {
  const { ruleNames } = req.body;
  const rules = getRules();
  const ruleASTs = ruleNames.map(name => rules[name]);
  const combinedRuleAST = ruleEngine.combineRules(ruleASTs);
  res.json(combinedRuleAST);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
