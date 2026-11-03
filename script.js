const form = document.querySelector("#expense-form");
const expenseList = document.querySelector("#expense-list");
const totalDisplay = document.querySelector("#total");
const expenseCountDisplay = document.querySelector("#expense-count");
const filteredCountDisplay = document.querySelector("#filtered-count");

const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");

const storageKey = "expense-tracker-expenses-v1";
const categories = ["food", "transport", "internet", "other"];

const categoryFilter = document.querySelector("#category-filter");
const filteredTotalDisplay = document.querySelector("#filtered-total");

categoryFilter.addEventListener("change", function () {
  renderExpenses();
});

const startingExpenses = [
  { description: "Food", category: "food", amount: 1500 },
  { description: "Transport", category: "transport", amount: 1000 },
  { description: "Internet", category: "internet", amount: 18000 },
  { description: "Food", category: "food", amount: 6000 },
];

let expenses = [];

// Calculate the total from the expense records.
function calculateTotal(records) {
  return records.reduce(function (sum, expense) {
    return sum + expense.amount;
  }, 0);
}

// Save first, then update the page only if saving succeeds.
function saveExpenses(updatedExpenses) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(updatedExpenses));
  } catch (error) {
    alert("Unable to save. Your expense list has not been changed.");
    return false;
  }

  expenses = updatedExpenses;
  renderExpenses();
  return true;
}

// Rebuild the visible list and calculate its total.
function renderExpenses() {
  expenseList.replaceChildren();

  const selectedCategory = categoryFilter.value;
  let visibleCount = 0;
  let visibleTotal = 0;

  expenses.forEach(function (expense, index) {
    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;

    if (!matchesCategory) {
      return;
    }

    visibleCount += 1;
    visibleTotal += expense.amount;


    const item = document.createElement("li");

    if (expense.amount >= 10000) {
      item.classList.add("large-expense");
    }

    const expenseText = document.createElement("span");

    expenseText.textContent =
      `${expense.description} (${expense.category}): ` +
      `₦${expense.amount.toLocaleString("en-NG")}`;

    if (expense.amount >= 10000) {
      expenseText.textContent += " — Large expense";
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
      const remainingExpenses = expenses.filter(function (_, position) {
        return position !== index;
      });

      saveExpenses(remainingExpenses);
    });

    item.appendChild(expenseText);
    item.appendChild(deleteButton);
    expenseList.appendChild(item);
  });

  if (visibleCount === 0) {
    const message = document.createElement("li");

    message.textContent =
      expenses.length === 0
        ? "No expenses yet. Add your first expense above."
        : "No expenses in this category.";

    expenseList.appendChild(message);
  }

  filteredTotalDisplay.textContent = `₦${visibleTotal.toLocaleString("en-NG")}`;

  totalDisplay.textContent = `₦${calculateTotal(expenses).toLocaleString("en-NG")}`;

  expenseCountDisplay.textContent = expenses.length;
  filteredCountDisplay.textContent = visibleCount;
}

// Read saved records, using defaults only when nothing has been saved.
function loadExpenses() {
  try {
    const savedExpenses = localStorage.getItem(storageKey);

    const records =
      savedExpenses === null ? startingExpenses : JSON.parse(savedExpenses);

    const validRecords =
      Array.isArray(records) &&
      records.every(function (expense) {
        return (
          expense !== null &&
          typeof expense === "object" &&
          typeof expense.description === "string" &&
          expense.description.trim() !== "" &&
          categories.includes(expense.category) &&
          Number.isSafeInteger(expense.amount) &&
          expense.amount > 0
        );
      });

    if (!validRecords || !Number.isSafeInteger(calculateTotal(records))) {
      throw new Error("Invalid saved expenses");
    }

    expenses = records;
    renderExpenses();
    return true;
  } catch (error) {
    totalDisplay.textContent = "Unable to load";
    form.querySelector('button[type="submit"]').disabled = true;

    alert(
      "Unable to load saved expenses. Existing saved data has not " +
        "been overwritten. Please share this message before continuing.",
    );

    return false;
  }
}

function addExpense(event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amountText = amountInput.value.trim();
  const category = categoryInput.value;

  if (description === "") {
    alert("Please enter a description, not just spaces.");
    return;
  }

  const validAmountFormat = /^(?:[0-9]+|[1-9][0-9]{0,2}(?:,[0-9]{3})+)$/.test(
    amountText,
  );

  if (!validAmountFormat) {
    alert("Enter whole naira, such as 2000 or 2,000. No decimals.");
    return;
  }

  const amount = Number(amountText.replaceAll(",", ""));

  if (!Number.isSafeInteger(amount) || amount < 1) {
    alert("Please enter a valid positive whole-naira amount.");
    return;
  }

  if (!categories.includes(category)) {
    alert("Please choose a category.");
    return;
  }

  if (!Number.isSafeInteger(calculateTotal(expenses) + amount)) {
    alert("That amount would make the total too large.");
    return;
  }

  const newExpense = { description, category, amount };
  const updatedExpenses = [...expenses, newExpense];

  if (saveExpenses(updatedExpenses)) {
    form.reset();
    descriptionInput.focus();
  }
}

if (loadExpenses()) {
  form.addEventListener("submit", addExpense);
}
