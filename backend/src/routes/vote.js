const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { log } = require("console");
const prisma = new PrismaClient();

  
router.post("/", async (req, res) => {
  const { voterId, candidateId } = req.body;


    // Verificamos que el votante exista
  const voter = await prisma.voter.findUnique({ where: { document: voterId } });
    if (!voter) {console.log("Voter not found");
    
        return res.status(404).json({ message: "Voter not found" })};

  // Verificamos que no haya votado antes
  const hasVoted = await prisma.vote.findFirst({ where: { voterId: voter.document } });
  console.log("hasVoted", hasVoted);
  
  if (hasVoted) return res.status(400).json({ message: "Voter already voted" });
console.log("Voter has not voted yet");

  // Registramos el voto
  const vote = await prisma.vote.create({
    data: {
      voterId: voter.document,
      candidateId,
    },
  });
  console.log("Vote registered", vote);
  

  res.json({ message: "Vote recorded successfully" });
});

module.exports = router;
