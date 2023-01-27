import prisma from "../src/database.js";

async function main() {
  await prisma.departments.createMany({
    data: [
      {name:"Administration"},
      {name:"Finance department"},
      {name:"Marketing"},
      {name:"Human Resources"},
      {name:"UX/UI"},
      {name:"Sales"},
      {name:"Back-end"}, 
      {name:"Front-end"}
    ]
  })
  await prisma.positions.createMany({
    data: [
      {name:"assistant",
      salary:250000},
      {name:"junior",
      salary:400000},
      {name:"middle",
      salary:650000},
      {name:"senior",
      salary:800000},
      {name:"leader",
      salary:1100000},
    ]
  })
  await prisma.employees.createMany({
    data: [
      {
        name: "Maria",
        email: "maria@gmail.com",
        position_id: 3,
        department_id: 4,
      },
      {
        name: "João",
        email: "joao@gmail.com",
        position_id: 5,
        department_id: 3,
      },
      {
        name: "André",
        email: "andre@gmail.com",
        position_id: 1,
        department_id: 6,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Novos registros incluídos no banco de dados.");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
