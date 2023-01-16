const handler = (req: any, res: any) => {
  if (req.method === "POST") {
    const requestBody = JSON.parse(req.body);
    const emailToRegister = requestBody.email;
    console.log("Email registered", emailToRegister);
    res.status(201).json({ message: emailToRegister });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
