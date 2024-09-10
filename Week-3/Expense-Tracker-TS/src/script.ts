type Expense = {
  name: string;
  amount: number;
  date: string;
};

let expenses: Expense[] = [];
let mode: "save" | "edit" = "save";
let currentEditIndex = 0;

const saveExpenseButton = document.getElementById("saveExpenseButton") as HTMLButtonElement;

const addExpense = document.getElementById("addExpense") as HTMLButtonElement;

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM fully loaded and parsed');
  expenses = getExpensesFromLocalstorage();
  updateExpense(expenses);
  renderBarChart();
  renderPieChart();
});

addExpense.addEventListener("click", () => {
  console.log('Add Expense button clicked');
  mode = "save";
  (document.getElementById("expenseForm") as HTMLFormElement).reset();
});

saveExpenseButton.addEventListener("click", function () {
  const expenseName = (
    document.getElementById("expenseName") as HTMLInputElement
  ).value.trim();

  const expenseAmount = parseFloat(
    (document.getElementById("expenseAmount") as HTMLInputElement).value
  );

  const expenseDate = (
    document.getElementById("expenseDate") as HTMLInputElement
  ).value;

  if (expenseName && expenseAmount > 0 && expenseDate) {
    const newExpense: Expense = {
      name: expenseName,
      date: expenseDate,
      amount: expenseAmount,
    };

    if (mode === "edit") {
      expenses[currentEditIndex] = newExpense;
    } else if (mode === "save") {
      expenses.push(newExpense);
    }
    mode = mode === "edit" ? "save" : mode;
    currentEditIndex = 0;
    saveExpensesToLocalStorage();
    updateExpense(expenses);
    renderBarChart(); // Update the bar chart
    renderPieChart(); // Update the pie chart

    // Close the modal after saving the data
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addExpenseModal") as HTMLElement
    );
    modal?.hide();

    // Reset the form
    (document.getElementById("expenseForm") as HTMLFormElement).reset();
    (
      document.getElementById("saveExpenseButton") as HTMLButtonElement
    ).textContent = "Save Expense";
  } else {
    if (expenseAmount <= 0) {
      alert("Please fill in a valid amount");
    }
    alert("Please fill in all fields");
  }
});

const updateExpense = (expenseList: Expense[]) => {
  const expenseListNode = document.getElementById(
    "expenseList"
  ) as HTMLUListElement;
  expenseListNode.innerHTML = "";
  expenseList.forEach((expense, index) => {
    const listNode = createNode(expense, index);
    expenseListNode.appendChild(listNode);
  });
};

const createNode = ({ name, date, amount }: Expense, index: number) =>  {
  console.log('create node');
  
  const newExpenseLiNode = document.createElement("li");
  newExpenseLiNode.className =
    "expense-item d-flex justify-content-between px-3 border rounded-2";
  newExpenseLiNode.innerHTML = `<div class="col-4">${name}</div>  
    <span class="col-3"><i class="fa-solid fa-indian-rupee-sign"></i>${amount}</span>
        <span class="text-muted col-3">${date}</span>
        <div class="edit-delete-btn col-2">
            <button class="btn btn-warning btn-sm float-end ms-2 edit-expense" data-bs-toggle="modal" data-bs-target="#addExpenseModal"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn btn-danger btn-sm float-end delete-expense"><i class="fa-solid fa-trash"></i></button>
        </div>`;

        console.log('Attaching event listeners for index:', index);
  newExpenseLiNode
    .querySelector(".edit-expense")
    ?.addEventListener("click", () => {
      console.log('Edit button clicked for index:', index);
      editExpense(index)
    } );
  newExpenseLiNode
    .querySelector(".delete-expense")
    ?.addEventListener("click", () => {
      console.log('Delete button clicked for index:', index);
      deleteExpense(index)
});

  return newExpenseLiNode;
};

const editExpense = (index: number) => {
  const { name, amount, date } = expenses[index];
  mode = "edit";
  currentEditIndex = index;

  const modal = new bootstrap.Modal(
    document.getElementById("addExpenseModal") as HTMLElement
  );
  modal.show();

  (
    document.getElementById("saveExpenseButton") as HTMLButtonElement
  ).textContent = "Update Expense";

  (document.getElementById("expenseName") as HTMLInputElement).value = name;
  (document.getElementById("expenseAmount") as HTMLInputElement).value =
    amount.toString();
  (document.getElementById("expenseDate") as HTMLInputElement).value = date;
};

const deleteExpense = (index: number) => {
  expenses = expenses.filter((_, idx) => idx !== index);
  updateExpense(expenses);
  saveExpensesToLocalStorage();
  renderBarChart(); // Update the bar chart
  renderPieChart(); // Update the pie chart
};

const destroyChartIfExists = (chart: any) => {
  if (chart && chart.destroy) {
    chart.destroy();
  }
};

// Chart rendering functions
let myBarChart: any = null;
let myPieChart: any = null;

const renderBarChart = () => {
  const ctxBar = (
    document.getElementById("myBarChart") as HTMLCanvasElement
  ).getContext("2d");

  // Destroy the existing chart instance if it exists
  destroyChartIfExists(myBarChart);

  // Create a new bar chart
  myBarChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: expenses.map((e) => e.name),
      datasets: [
        {
          label: "Amount Spent",
          data: expenses.map((e) => e.amount),
          borderWidth: 1,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 206, 86, 1)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {},
    },
  });
};

const renderPieChart = () => {
  const ctxPie = (
    document.getElementById("myPieChart") as HTMLCanvasElement
  ).getContext("2d");

  // Destroy the existing chart instance if it exists
  destroyChartIfExists(myPieChart);

  // Create a new pie chart
  myPieChart = new Chart(ctxPie, {
    type: "doughnut",
    data: {
      labels: expenses.map((e) => e.name),
      datasets: [
        {
          label: "Amount Distribution",
          data: expenses.map((e) => e.amount),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
};

const saveExpensesToLocalStorage = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

const getExpensesFromLocalstorage = () => {
  let savedExpenses = localStorage.getItem("expenses");
  return savedExpenses ? JSON.parse(savedExpenses) : [];
};

// Initial chart render
renderBarChart();
renderPieChart();
