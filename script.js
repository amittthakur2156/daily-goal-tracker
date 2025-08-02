// 📌 Select elements
const input = document.getElementById("goalInput");
const addBtn = document.getElementById("addGoalBtn");
const list = document.getElementById("goalList");
const progressText = document.getElementById("progressText");

// 📌 Load saved goals on start
let goals = JSON.parse(localStorage.getItem("goals")) || [];
renderGoals();

// 📌 Add goal
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  goals.push({ text, done: false });
  saveAndRender();
  input.value = "";
});

// 📌 Save to localStorage & render UI
function saveAndRender() {
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

// 📌 Render all goals
function renderGoals() {
  list.innerHTML = "";
  let doneCount = 0;

  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="flex: 1; ${goal.done ? 'text-decoration: line-through;' : ''}">
        ${goal.text}
      </span>
      <button onclick="toggleDone(${index})">✔️</button>
      <button onclick="deleteGoal(${index})">🗑️</button>
    `;
    list.appendChild(li);
    if (goal.done) doneCount++;
  });

  // Update progress
  const total = goals.length;
  const percent = total ? Math.round((doneCount / total) * 100) : 0;
  progressText.textContent = `${doneCount} of ${total} goals completed (${percent}%)`;
}

// 📌 Toggle goal complete
function toggleDone(index) {
  goals[index].done = !goals[index].done;
  saveAndRender();
}

// 📌 Delete goal
function deleteGoal(index) {
  goals.splice(index, 1);
  saveAndRender();
}

// Theme toggle button
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Save theme preference
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});
