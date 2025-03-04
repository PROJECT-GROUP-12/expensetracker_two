document.addEventListener("DOMContentLoaded", () => {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function updateBalance() {
        let balance = transactions.reduce((acc, transaction) => 
            transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount, 0);
        document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
    }

    function renderTransactions() {
        const transactionsList = document.getElementById("transactions");
        transactionsList.innerHTML = "";
        transactions.forEach((transaction, index) => {
            const li = document.createElement("li");
            li.classList.add(transaction.type);
            li.innerHTML = `${transaction.description}: $${transaction.amount.toFixed(2)} 
                <button onclick="deleteTransaction(${index})">X</button>`;
            transactionsList.appendChild(li);
        });
    }

    function addTransaction() {
        const description = document.getElementById("description").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;

        if (!description || isNaN(amount) || amount <= 0) {
            alert("Please enter valid data.");
            return;
        }

        transactions.push({ description, amount, type });
        localStorage.setItem("transactions", JSON.stringify(transactions));
        
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        
        updateBalance();
        renderTransactions();
    }

    function deleteTransaction(index) {
        transactions.splice(index, 1);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateBalance();
        renderTransactions();
    }

    window.addTransaction = addTransaction;
    window.deleteTransaction = deleteTransaction;

    updateBalance();
    renderTransactions();
});
