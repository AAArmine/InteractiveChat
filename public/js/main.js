const socket = io();

socket.on("message", (data) => {
  outputMsg(data);
});

const chatForm = document.getElementById("chat-form");
const messagesContainer = document.querySelector(".chat-messages");

const outputMsg = (data) => {
  const div = document.createElement("div");
  const container = document.querySelector(".chat-messages");
  div.classList.add("message");
  div.innerHTML = `<p class='meta'>${data.username} <span>${data.time}</span></p><p class='text'>${data.text}</p>`;
  container.appendChild(div);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit("chatMsg", msg);
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});
