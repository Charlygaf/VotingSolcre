const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const candidates = await prisma.voter.findMany({ where: { isCandidate: true } });
  res.json(candidates);
});

module.exports = router;
