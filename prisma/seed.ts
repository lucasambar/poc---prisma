import prisma from "../src/database.js";

async function main() {
  await prisma.employees.createMany({
    data: [
      {
        name: "Maria",
        email: "maria@gmail.com",
        position_id: 7,
        departament_id: 7,
      },
      {
        name: "João",
        email: "joao@gmail.com",
        position_id: 3,
        departament_id: 3,
      },
      {
        name: "André",
        email: "andre@gmail.com",
        position_id: 1,
        departament_id: 6,
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
