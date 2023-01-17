import { MongoClient } from "mongodb";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const emailToRegister = req.body.email;
    if (!emailToRegister || !emailToRegister.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://nextJsPractice:nextJsPractice34@cluster0.h3k9eua.mongodb.net/newsletter?retryWrites=true&w=majority"
    );

    const db = client.db();
    await db.collection("emails").insertOne({ email: emailToRegister });

    client.close();

    res.status(201).json({ message: "Signed Up!" });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
