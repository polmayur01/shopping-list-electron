const { ipcRenderer } = require("electron");

const form = document.getElementById("add-form");
const input = document.getElementById("item");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log('ew')
  const value = input.value.trim();
  if (!value) return;
  ipcRenderer.send("item:add", value);
  input.value = "";
});
