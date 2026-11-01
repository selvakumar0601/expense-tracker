
const STORAGE_KEY = "expenseTrackerData";

let expenses = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

let editingId = null;

const form = document.getElementById("expenseForm");

const today = new Date().toISOString().split("T")[0];
document.getElementById("date").value = today;
document.getElementById("date").max = today;

function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(expenses)
  );
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amount);
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  const search = document.getElementById("search")
    .value.toLowerCase();

  const category = document.getElementById("filterCategory").value;
  const from = document.getElementById("fromDate").value;
  const to = document.getElementById("toDate").value;
  const sort = document.getElementById("sort").value;

  let filtered = expenses.filter(item => {
    return (
      item.title.toLowerCase().includes(search) &&
      (category === "all" || item.category === category) &&
      (!from || item.date >= from) &&
      (!to || item.date <= to)
    );
  });

  filtered.sort((a, b) => {
    if (sort === "oldest") return a.date.localeCompare(b.date);
    if (sort === "high") return b.amount - a.amount;
    if (sort === "low") return a.amount - b.amount;
    return b.date.localeCompare(a.date);
  });

  filtered.forEach(item => {
    const row = document.createElement("tr");

    const values = [
      item.title,
      item.category,
      item.date,
      formatMoney(item.amount)
    ];

    values.forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "action-btn edit-btn";
    editButton.addEventListener("click", () => editExpense(item.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "action-btn delete-btn";
    deleteButton.addEventListener("click", () => deleteExpense(item.id));

    actionCell.append(editButton, deleteButton);
    row.appendChild(actionCell);
    list.appendChild(row);
  });

  document.getElementById("emptyMessage").hidden =
    filtered.length > 0;

  document.getElementById("count").textContent =
    `Showing ${filtered.length} of ${expenses.length} expenses`;

  updateSummary(filtered);
}

function updateSummary(filtered) {
  const total = filtered.reduce(
    (sum, item) => sum + item.amount, 0
  );

  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `${now.getFullYear()}-${month}`;

  const monthly = expenses
    .filter(item => item.date.startsWith(prefix))
    .reduce((sum, item) => sum + item.amount, 0);

  const average = filtered.length
    ? total / filtered.length
    : 0;

  document.getElementById("total").textContent =
    formatMoney(total);

  document.getElementById("monthly").textContent =
    formatMoney(monthly);

  document.getElementById("average").textContent =
    formatMoney(average);
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value.trim();

  if (!title || !Number.isFinite(amount) || amount <= 0 || !date) {
    alert("Please enter valid expense details.");
    return;
  }

  if (date > today) {
    alert("Future dates are not allowed.");
    return;
  }

  if (editingId !== null) {
    expenses = expenses.map(item =>
      item.id === editingId
        ? { ...item, title, amount, category, date, notes }
        : item
    );
  } else {
    expenses.push({
      id: Date.now().toString(),
      title,
      amount,
      category,
      date,
      notes
    });
  }

  saveData();
  resetForm();
  renderExpenses();
});

function editExpense(id) {
  const item = expenses.find(expense => expense.id === id);
  if (!item) return;

  editingId = id;

  document.getElementById("title").value = item.title;
  document.getElementById("amount").value = item.amount;
  document.getElementById("category").value = item.category;
  document.getElementById("date").value = item.date;
  document.getElementById("notes").value = item.notes || "";

  document.getElementById("formTitle").textContent = "Edit Expense";
  document.getElementById("submitBtn").textContent = "Save Changes";
  document.getElementById("cancelEdit").hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteExpense(id) {
  if (!confirm("Are you sure you want to delete this expense?")) {
    return;
  }

  expenses = expenses.filter(item => item.id !== id);

  if (editingId === id) resetForm();

  saveData();
  renderExpenses();
}

function resetForm() {
  form.reset();
  editingId = null;

  document.getElementById("date").value = today;
  document.getElementById("formTitle").textContent = "Add Expense";
  document.getElementById("submitBtn").textContent = "Add Expense";
  document.getElementById("cancelEdit").hidden = true;
}

document.getElementById("cancelEdit")
  .addEventListener("click", resetForm);

["search", "filterCategory", "fromDate", "toDate", "sort"]
  .forEach(id => {
    document.getElementById(id)
      .addEventListener("input", renderExpenses);
  });

renderExpenses();
