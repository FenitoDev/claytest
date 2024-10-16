import prisma from "../prisma";

describe("Prisma Client", () => {
  it("should connect to the database", async () => {
    const ping = await prisma.$queryRaw`SELECT 1`;
    expect(ping).toBeDefined();
  });
});
