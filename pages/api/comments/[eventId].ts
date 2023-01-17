import { MongoClient } from "mongodb";
import {
  connectDatabase,
  getDocuments,
  insertDocument,
} from "../../../helpers/db_util";

const handler = async (req: any, res: any) => {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connection to db failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      eventId: eventId,
      email: email,
      name: name,
      comment: comment,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
    } catch (err) {
      res.status(500).json({ message: "Inserting to db failed" });
      return;
    }

    newComment._id = result.insertedId.toString();
    client.close();
    res.status(201).json({ newComment });
  } else if (req.method === "GET") {
    let result;
    try {
      result = await getDocuments(
        client,
        "comments",
        { eventId: eventId },
        { _id: -1 }
      );
    } catch (err) {
      res.status(500).json({ message: "getting document failed" });
      return;
    }

    res.status(200).json({ filteredComments: result });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
  client.close();
};
export default handler;
