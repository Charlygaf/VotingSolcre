const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { log } = require("console");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { voterId, candidateId } = req.body;

 
  const voter = await prisma.voter.findUnique({ where: { document: voterId } });
  if (!voter) {
    return res.status(404).json({ message: "El votante no existe" });
  }

  const hasVoted = await prisma.vote.findFirst({
    where: { voterId: voter.document },
  });

  if (hasVoted) return res.status(400).json({ message: "Votante ya ha voto" });

  const vote = await prisma.vote.create({
    data: {
      voterId: voter.document,
      candidateId,
    },
  });

  res.json({ message: "Vote recorded successfully" });
});

module.exports = router;
