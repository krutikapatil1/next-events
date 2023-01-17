const handler = (req: any, res: any) => {
  if (req.method === "POST") {
    const emailToRegister = req.body.email;
    if (!emailToRegister || !emailToRegister.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }
    console.log("Email registered", emailToRegister);
    res.status(201).json({ message: "Signed Up!" });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
