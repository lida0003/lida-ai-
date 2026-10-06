# Lida AI — complete starter

## Wat zit erin?
- Moderne Lida AI-chatwebsite
- Node.js + Express backend
- OpenAI Responses API
- API-key alleen op de server via `.env`
- Gespreksgeschiedenis in de browser tijdens de sessie
- Mobielvriendelijke donkere/oranje interface

## Installeren

1. Installeer Node.js.
2. Open een terminal in deze map.
3. Run:
   `npm install`
4. Maak een kopie van `.env.example` met de naam `.env`.
5. Zet je eigen API-key in `.env`:
   `OPENAI_API_KEY=...`
6. Start:
   `npm start`
7. Open:
   `http://localhost:3000`

De API-key hoort nooit in `public/app.js` of `public/index.html`.

De app gebruikt de huidige OpenAI Responses API. De oudere Assistants API is niet gebruikt.
