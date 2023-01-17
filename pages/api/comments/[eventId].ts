import fs from "fs";
import path from "path";

export const getFilePath = () => {
  return path.join(process.cwd(), "data", "comments.json");
};

export const getComments = (filePath: string) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
};

const handler = (req: any, res: any) => {
  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const requestBody = JSON.parse(req.body);
    const filePath = getFilePath();
    const data = getComments(filePath);

    data.push({
      id: new Date(),
      eventId: eventId,
      email: requestBody.email,
      name: requestBody.name,
      comment: requestBody.comment,
    });

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Comment added successfully" });
  } else if (req.method === "GET") {
    const filePath = getFilePath();
    const data = getComments(filePath);

    const filteredComments = data.filter(
      (comment: any) => comment.eventId === eventId
    );
    res.status(200).json({ filteredComments: filteredComments });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};
export default handler;
