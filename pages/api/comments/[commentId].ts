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
  const commentId = req.query.commentId;
  if (req.method === "POST") {
    const requestBody = JSON.parse(req.body);
    const filePath = getFilePath();
    const data = getComments(filePath);

    data.push({
      id: commentId,
      email: requestBody.email,
      name: requestBody.name,
      comment: requestBody.comment,
    });

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Comment added successfully" });
  } else if (req.method === "GET") {
    const filePath = getFilePath();
    const data = getComments(filePath);

    const filteredComment = data.find(
      (comment: any) => comment.id === commentId
    );
    res.status(200).json({ comment: filteredComment });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};
export default handler;
