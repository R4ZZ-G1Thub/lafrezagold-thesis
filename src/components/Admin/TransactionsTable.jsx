import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost/lafreza-server/admin/fetch_transactions.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const result = await response.json();
        console.log("Transactions: ", result);

        if (response.ok) {
          const sorted = result.data.sort(
            (a, b) => b.transaction_id - a.transaction_id
          );
          setTransactions(sorted);
          setLoading(false);
        } else {
          setErrorMessage(result.message || "Failed to load transactions");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setErrorMessage("An error occurred. Please try again later.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const exportToCSV = () => {
    if (!transactions.length) return;

    const headers = [
      "Transaction ID",
      "Guest ID",
      "Reservation ID",
      "Amount",
      "Payment Method",
      "Status",
      "Created At",
    ];

    const rows = transactions.map((txn) => [
      txn.transaction_id,
      txn.guest_id,
      txn.reservation_id,
      txn.amount,
      txn.payment_method,
      txn.status,
      txn.created_at,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transaction_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Spinner />;
  if (errorMessage)
    return <p className="text-center mt-10 text-red-500">{errorMessage}</p>;

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={exportToCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Export Report
        </button>
      </div>

      <table className="w-full mb-4 mt-5">
        <thead>
          <tr>
            <th className="w-10">Txn ID</th>
            <th className="w-1/6">Guest ID</th>
            <th className="w-1/6">Reservation ID</th>
            <th className="w-1/6">Amount</th>
            <th className="w-1/6">Payment Method</th>
            <th className="w-1/6">Status</th>
            <th className="w-1/6">Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.transaction_id} className="py-1">
              <td className="w-10 py-1 px-2 border">{txn.transaction_id}</td>
              <td className="w-1/6 py-1 px-2 border">{txn.guest_id}</td>
              <td className="w-1/6 py-1 px-2 border">{txn.reservation_id}</td>
              <td className="w-1/6 py-1 px-2 border">Php {txn.amount}</td>
              <td className="w-1/6 py-1 px-2 border">{txn.payment_method}</td>
              <td className="w-1/6 py-1 px-2 border">{txn.status}</td>
              <td className="w-1/6 py-1 px-2 border">{txn.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
