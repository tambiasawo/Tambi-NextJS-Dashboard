import React from "react";
import { addTransaction, fetchTransactions } from "../actions";
import DataTable from "../ui/Table";
import Toolbar from "../ui/Toolbar";
import { transactionsColumns } from "../components/Dashboard";

const Transactions = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  const searchTerm = searchParams.q;
  const transactions = await fetchTransactions(searchTerm);

  return (
    <div className="px-4 py-2 bg-softBg rounded-md h-screen">
      <Toolbar
        action={addTransaction}
        title="Transaction"
        formFields={[
          { type: "number", name: "invoice", placeholder: "Invoice" },
          { type: "number", name: "amount", placeholder: "Amount" },
          { type: "text", name: "recipient", placeholder: "Recipient" },
          {
            type: "textarea",
            name: "description",
            placeholder: "Description",
          },
        ]}
      />
      <DataTable
        rows={JSON.parse(JSON.stringify(transactions))}
        columns={transactionsColumns}
      />
    </div>
  );
};

export default Transactions;
