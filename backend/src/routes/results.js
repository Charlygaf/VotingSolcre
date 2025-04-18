const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const votes = await prisma.vote.findMany({
    include: { candidate: true },
  });

  const results = votes.reduce((acc, vote) => {
    const id = vote.candidateId;
    const name = vote.candidate.name;
    acc[id] = acc[id] || { id, name, votes: 0 };
    acc[id].votes++;
    return acc;
  }, {});

  res.json(Object.values(results));
});

module.exports = router;
