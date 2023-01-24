## PEOPLE MANEGEMENT
### Prove of concepts  - TypeScript
---
API to manage the employees of a tech business. You can register the departments, positions and workers here.

**POST: /employess**

Register a new employee at this business.

body:
```JSON
{
    "name": "how they want to be called by",
    "email": "must be a unique email per worker",
    "position_id": "reference of the position",
    "departament_id": "reference of the departament"
}
```
Departaments & positions references
 id | name                | id |   name    | salary    
----|---------------------|----|-----------|---------
  1 | Administration      |  1 | assistant | 2500000
  2 | Finance department  |  2 | junior    |  400000
  3 | Marketing           |  3 | middle    | 6500000
  4 | Human Resources     |  6 | senior    |  800000
  5 | UX/UI               |  7 | leader    | 1100000 
  6 | Sales               |
  7 | Back-end            |
  8 | Front-end           |

**GET: /employess**

List all employess that work at this business.

response:
```JSON
{
    "id": "identifictor number",
    "name": "name registered",
    "email": "contact email",
    "position": "level in the business",
    "departament": "departament that the employees works",
    //following values of playrolll for each employee based in brazilian work laws
    "playroll_br" : { 
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
**PUT: /employess/:id**

Update an employees information using their id.

```JSON
{
    "name": "how they want to be called by",
    "email": "must be a unique email per worker",
    "position_id": "reference of the position",
    "departament_id": "reference of the departament"
}
```
**DELETE: /employess/:id**

DElete an employee from the business database using their id.