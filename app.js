const form = document.querySelector("#form");
const input = document.querySelector("#input");
const chat = document.querySelector("#chat");
const send = document.querySelector("#send");
const history = [];

function addMessage(role, text) {
  const row = document.createElement("div");
  row.className = `message ${role === "user" ? "user" : "ai"}`;
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "" : "L";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  const p = document.createElement("p");
  p.textContent = text;
  bubble.appendChild(p);
  row.append(avatar, bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage(text) {
  if (!text.trim()) return;
  document.querySelector(".welcome")?.remove();

  history.push({ role: "user", content: text });
  addMessage("user", text);
  input.value = "";
  input.disabled = true;
  send.disabled = true;

  const thinking = "Lida AI is aan het denken…";
  addMessage("assistant", thinking);
  const thinkingBubble = chat.lastElementChild.querySelector("p");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history })
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Request failed");

    thinkingBubble.textContent = data.reply;
    history.push({ role: "assistant", content: data.reply });
  } catch (error) {
    thinkingBubble.textContent = "Oeps 😭 " + error.message;
    history.pop();
  } finally {
    input.disabled = false;
    send.disabled = false;
    input.focus();
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  sendMessage(input.value);
});

document.querySelectorAll(".suggestions button").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.text));
});
