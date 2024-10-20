document.getElementById('ruleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ruleString = document.getElementById('ruleInput').value;
    const ruleName = document.getElementById('ruleName').value;
  
    const response = await fetch('http://localhost:3000/create_rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruleString, ruleName }),
    });
  
    const result = await response.json();
    alert(result.message);
  });
  
  document.getElementById('evaluateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ruleName = document.getElementById('ruleNameEval').value;
    const data = JSON.parse(document.getElementById('dataInput').value);
  
    const response = await fetch('http://localhost:3000/evaluate_rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruleName, data }),
    });
  
    const result = await response.json();
    document.getElementById('result').innerText = `Result: ${result.result}`;
  });
  