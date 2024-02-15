import { fetchTransaction, updateTransaction } from "@/app/actions";
import React from "react";
import styles from "@/app/styles/SingleUser.module.css";

const SingleTransaction = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const trans = await fetchTransaction(id);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.formContainer}>
        <form className={styles.form} action={updateTransaction}>
          <label className="text-[22px]">Recipient</label>
          <input type="text" name="id" hidden value={trans.id} readOnly />
          <input
            type="text"
            name="recipient"
            placeholder={trans.recipient}
            required
          />
          <label>Invoice Number</label>
          <input
            type="text"
            name="invoice"
            placeholder={trans.invoice}
            required
          />
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            placeholder={trans.amount}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder={trans.description}
            rows={8}
          />

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTransaction;
