import { getFilePath, getComments } from "./[eventId]";

const handler = (req: any, res: any) => {
  if (req.method === "GET") {
    const filePath = getFilePath();
    const data = getComments(filePath);
    res.status(200).json({ comments: data });
  }
};
export default handler;
