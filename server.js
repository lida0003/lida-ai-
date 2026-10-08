
      
   import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", (req, res) => {
  const message = (req.body.message || "").toLowerCase();

  let reply;

  if (message.includes("hallo") || message.includes("hoi") || message.includes("hi")) {
    reply = "Hoi! 🍂🧡 Leuk dat je met Lida AI praat!";
  } else if (message.includes("grap")) {
    reply = "Waarom nam de computer een jas mee? Omdat hij bang was voor een virus! 😂";
  } else if (message.includes("idee")) {
    reply = "✨ Creatief idee: maak een herfstplaylist en ontwerp er een eigen cover voor!";
  } else if (message.includes("huiswerk")) {
    reply = "📚 Stuur je vraag en ik probeer je te helpen!";
  } else if (message.includes("herfst")) {
    reply = "🍂 Herfst is perfect voor warme drankjes, muziek en gezellige avonden!";
  } else {
    reply = "Hmm 🤔 Daar moet ik nog iets slimmer voor worden! Probeer eens 'grap', 'idee', 'huiswerk' of 'herfst'. 🍂";
  }

  res.json({ reply });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Lida AI draait op poort ${port}`);
});
