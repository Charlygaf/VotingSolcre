
// model Admin {
//     id       Int    @id @default(autoincrement())
//     name    String
//     lastName String
//     email    String @unique
//     password String
//   }
  
//   model Voter {
   
//     document         String  @id
//     name        String 
//     lastName   String
//     isCandidate Boolean @default(false)
//     dob        DateTime
//     votes       Vote[]  @relation("VotesCast")
//     received    Vote[]  @relation("VotesReceived")
//   }
  
//   model Vote {
//     id           Int   @id @default(autoincrement())
//     voter        Voter @relation("VotesCast", fields: [voterId], references: [document])
//     voterId      String
//     candidate    Voter @relation("VotesReceived", fields: [candidateId], references: [document])
//     candidateId  String
//   }



export type Vote = {

voterId: string;
candidateId: string;
};
export type Voter = {
    document: string;
    name: string;
    lastName: string;
    dob: Date;

};