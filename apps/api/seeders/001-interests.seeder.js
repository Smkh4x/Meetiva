
export async function up(queryInterface) {
    await queryInterface.bulkInsert("Interests", [
  {
    interest: "Football",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    interest: "Gaming",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    interest: "Programming",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    interest: "Music",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    interest: "Travel",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    interest: "Chillling",
    createdAt: new Date(),
    updatedAt: new Date()
  }
    ])
}