var expenses = [];
var mode = "save";
var currentEditIndex = 0;
var saveExpenseButton = document.getElementById("saveExpenseButton");
var addExpense = document.getElementById("addExpense");
document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM fully loaded and parsed');
    expenses = getExpensesFromLocalstorage();
    updateExpense(expenses);
    renderBarChart();
    renderPieChart();
});
addExpense.addEventListener("click", function () {
    console.log('Add Expense button clicked');
    mode = "save";
    document.getElementById("expenseForm").reset();
});
saveExpenseButton.addEventListener("click", function () {
    var expenseName = document.getElementById("expenseName").value.trim();
    var expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
    var expenseDate = document.getElementById("expenseDate").value;
    if (expenseName && expenseAmount > 0 && expenseDate) {
        var newExpense = {
            name: expenseName,
            date: expenseDate,
            amount: expenseAmount,
        };
        if (mode === "edit") {
            expenses[currentEditIndex] = newExpense;
        }
        else if (mode === "save") {
            expenses.push(newExpense);
        }
        mode = mode === "edit" ? "save" : mode;
        currentEditIndex = 0;
        saveExpensesToLocalStorage();
        updateExpense(expenses);
        renderBarChart(); // Update the bar chart
        renderPieChart(); // Update the pie chart
        // Close the modal after saving the data
        var modal = bootstrap.Modal.getInstance(document.getElementById("addExpenseModal"));
        modal === null || modal === void 0 ? void 0 : modal.hide();
        // Reset the form
        document.getElementById("expenseForm").reset();
        document.getElementById("saveExpenseButton").textContent = "Save Expense";
    }
    else {
        if (expenseAmount <= 0) {
            alert("Please fill in a valid amount");
        }
        alert("Please fill in all fields");
    }
});
var updateExpense = function (expenseList) {
    var expenseListNode = document.getElementById("expenseList");
    expenseListNode.innerHTML = "";
    expenseList.forEach(function (expense, index) {
        var listNode = createNode(expense, index);
        expenseListNode.appendChild(listNode);
    });
};
var createNode = function (_a, index) {
    var _b, _c;
    var name = _a.name, date = _a.date, amount = _a.amount;
    console.log('create node');
    var newExpenseLiNode = document.createElement("li");
    newExpenseLiNode.className =
        "expense-item d-flex justify-content-between px-3 border rounded-2";
    newExpenseLiNode.innerHTML = "<div class=\"col-4\">".concat(name, "</div>  \n    <span class=\"col-3\"><i class=\"fa-solid fa-indian-rupee-sign\"></i>").concat(amount, "</span>\n        <span class=\"text-muted col-3\">").concat(date, "</span>\n        <div class=\"edit-delete-btn col-2\">\n            <button class=\"btn btn-warning btn-sm float-end ms-2 edit-expense\" data-bs-toggle=\"modal\" data-bs-target=\"#addExpenseModal\"><i class=\"fa-regular fa-pen-to-square\"></i></button>\n            <button class=\"btn btn-danger btn-sm float-end delete-expense\"><i class=\"fa-solid fa-trash\"></i></button>\n        </div>");
    console.log('Attaching event listeners for index:', index);
    (_b = newExpenseLiNode
        .querySelector(".edit-expense")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        console.log('Edit button clicked for index:', index);
        editExpense(index);
    });
    (_c = newExpenseLiNode
        .querySelector(".delete-expense")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        console.log('Delete button clicked for index:', index);
        deleteExpense(index);
    });
    return newExpenseLiNode;
};
var editExpense = function (index) {
    var _a = expenses[index], name = _a.name, amount = _a.amount, date = _a.date;
    mode = "edit";
    currentEditIndex = index;
    var modal = new bootstrap.Modal(document.getElementById("addExpenseModal"));
    modal.show();
    document.getElementById("saveExpenseButton").textContent = "Update Expense";
    document.getElementById("expenseName").value = name;
    document.getElementById("expenseAmount").value =
        amount.toString();
    document.getElementById("expenseDate").value = date;
};
var deleteExpense = function (index) {
    expenses = expenses.filter(function (_, idx) { return idx !== index; });
    updateExpense(expenses);
    saveExpensesToLocalStorage();
    renderBarChart(); // Update the bar chart
    renderPieChart(); // Update the pie chart
};
var destroyChartIfExists = function (chart) {
    if (chart && chart.destroy) {
        chart.destroy();
    }
};
// Chart rendering functions
var myBarChart = null;
var myPieChart = null;
var renderBarChart = function () {
    var ctxBar = document.getElementById("myBarChart").getContext("2d");
    // Destroy the existing chart instance if it exists
    destroyChartIfExists(myBarChart);
    // Create a new bar chart
    myBarChart = new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: expenses.map(function (e) { return e.name; }),
            datasets: [
                {
                    label: "Amount Spent",
                    data: expenses.map(function (e) { return e.amount; }),
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
var renderPieChart = function () {
    var ctxPie = document.getElementById("myPieChart").getContext("2d");
    // Destroy the existing chart instance if it exists
    destroyChartIfExists(myPieChart);
    // Create a new pie chart
    myPieChart = new Chart(ctxPie, {
        type: "doughnut",
        data: {
            labels: expenses.map(function (e) { return e.name; }),
            datasets: [
                {
                    label: "Amount Distribution",
                    data: expenses.map(function (e) { return e.amount; }),
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
var saveExpensesToLocalStorage = function () {
    localStorage.setItem("expenses", JSON.stringify(expenses));
};
var getExpensesFromLocalstorage = function () {
    var savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
};
// Initial chart render
renderBarChart();
renderPieChart();
