# Rule Engine Application with AST

## Description

This is a rule engine application that evaluates user eligibility based on various attributes such as age, department, income, etc. The application uses an Abstract Syntax Tree (AST) to represent conditional rules dynamically. Users can create, modify, and evaluate rules through the provided API and UI.

## Project Structure

- **api/**: Contains the API logic to create, combine, and evaluate rules.
- **backend/**: Contains the core business logic including AST creation and rule evaluation.
- **data/**: Stores sample rules and user data.
- **ui/**: Simple frontend interface to interact with the API.
- **README.md**: This file, which provides instructions.
- **package.json**: Node.js package information.

## Prerequisites

- Node.js installed on your machine.

## Installation and Running

1. Clone the repository:
    ```bash
    git clone https://github.com/souravdas2003/RuleEnginewithAST
    ```
    
2. Navigate to the project directory:
    ```bash
    cd rule-engine
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the application:
    ```bash
    node api/app.js
    ```

5. Open the application in your browser:
    ```
    http://localhost:3000/index.html
    ```

## Testing the Application

You can test the application with sample input and output as shown below:

### 1. **Create Rule**

#### Sample Input:

- **Rule String**: 
  
  (age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')
### Rule Name:
rule1
### Expected Output:
When you submit the rule, the backend will store this rule as an Abstract Syntax Tree (AST), and you will receive a message like:

  "message": "Rule created successfully!"

### 2. Evaluate Rule

### Sample Input:
Rule Name:
rule1

### Data (as JSON):

json
{
  "age": 35,
  "department": "Sales",
  "salary": 60000,
  "experience": 5
}
### Expected Output:
The rule engine will evaluate the provided data against the created rule and return:
  "result": true
This is because the user satisfies the condition (age > 30 AND department = 'Sales').
