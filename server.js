
      
    import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", (req, res) => {
  res.json({
    reply: "Hoi! 🍂 Ik ben Lida AI. Mijn echte AI-functie komt later!"
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Lida AI draait op poort ${port}`);
});
