import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT || 3000);

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is missing. Add it to .env before starting the server.");
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];

    const cleanMessages = messages
      .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-20)
      .map(m => ({ role: m.role, content: m.content.slice(0, 8000) }));

    if (!cleanMessages.length || cleanMessages.at(-1).role !== "user") {
      return res.status(400).json({ error: "Stuur eerst een bericht." });
    }

    const response = await client.responses.create({
      model: "gpt-6-luna",
      instructions: `Je bent Lida AI, een vriendelijke, slimme en creatieve AI-assistent.
Praat natuurlijk en duidelijk. Je mag Nederlands, Engels of Russisch gebruiken.
Je toon is casual, behulpzaam en positief, maar je doet niet alsof je een mens bent.
Houd antwoorden meestal kort en overzichtelijk, tenzij de gebruiker om meer uitleg vraagt.
Bij schoolwerk leg je dingen simpel stap voor stap uit.
Geef geen gevaarlijke of verboden instructies. Respecteer de veiligheid van jonge gebruikers.`,
      input: cleanMessages
    });

    res.json({ reply: response.output_text || "Ik kon geen antwoord maken." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Er ging iets mis met Lida AI. Controleer je API-key en probeer opnieuw."
    });
  }
});

app.listen(port, () => {
  console.log(`Lida AI draait op http://localhost:${port}`);
});
