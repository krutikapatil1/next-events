import { connectDatabase, insertDocument } from "../../helpers/db_util";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const emailToRegister = req.body.email;
    if (!emailToRegister || !emailToRegister.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Error connecting to the database" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: emailToRegister });
    } catch (err) {
      res.status(500).json({ message: "Failed to insert the document" });
      return;
    }

    client.close();
    res.status(201).json({ message: "Signed Up!" });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
