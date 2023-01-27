## PEOPLE MANEGEMENT
### Prove of concepts  - TypeScript
---
API to manage the employees of a tech business. You can register the departments, positions and workers here.
## Employee entity
Routes to manege employee's business.

**POST: /employee**

Register a new employee at this business.

body:
```JSON
{
    "name": "how they want to be called by",
    "email": "must be a unique email per worker",
    "position_id": "reference of the position",
    "department_id": "reference of the department"
}
```
You can get all he departments and positions ids using routes - get: /departments and get: /positions.

**GET: /employee**

List all employess that work at this business.

response:
```JSON
{
    "id": "identifictor number",
    "name": "name registered",
    "email": "contact email",
    "position": "level in the business",
    "department": "department that the employees works",
    //following values of payrolll for each employee based in brazilian work laws
    "payroll_br" : { 
      "gross_salary": "base salary in the position",
      "net_salary": "salary after brazilian charges",
      "inss": "value charged from employee to inss - based in 2023 rules",
      "ir": "value charged from employee to 'imposto de renda' - based in 2023 rules",
      "inss_business": "value charged from employer to inss and services - based in 2023 rules",
      "fgts": "value charged from employer to fgts - based in 2023 rules",
    }
}
```
Try using this query params: departments_id or position_id or both! So you can filter results.

**PUT: /employee/:id**

Update an employees information using their id.

```JSON
{
    "name": "how they want to be called by",
    "email": "must be a unique email per worker",
    "position_id": "reference of the position",
    "department_id": "reference of the department"
}
```
**DELETE: /employee/:id**

Delete an employee from the business database using their id.

## Department entity
Routes to manege the departments part of a business.

**GET: /departments**

Get an overview of all departments of your business.

Response:
```JSON
{
    "id": "ids used to identificate department in database",
    "name": "department's name",
    "employeesCount": "number of employees that work at this department"
}
```
**POST: /departments**

Insert a new department in database.
Body:
```JSON
{
    "name": "department's name must be unique",
}
```
**PUT: /departments/:id**

Change a department name in database.
Body:
```JSON
{
    "name": "department's name must be unique",
}
```
**DELETE: /departments/:id**

Delete a department in database using their id.

## Position entity
Routes to manege the positions and salaries of a business.

**GET: /positions**

Get an overview of all positions of your business.

Response:
```JSON
{
    "id": "ids used to identificate positon in database",
    "name": "position's name",
    "salary": "salary for this position in cents"
}
```
**POST: /positions**

Insert a new positon in database.

Body:
```JSON
{
    "name": "position's name must be unique",
    "salary": "value in cents, already set to be greater than the minimun in brazilian's law"
}
```
**PUT: /departments/:id**

Change a position's name or salary in database.

Body:
```JSON
{
    "name": "position's name must be unique",
    "salary": "value in cents, already set to be greater than the minimun in brazilian's law"
}
```
**DELETE: /departments/:id**

Delete a position in database using their id.
