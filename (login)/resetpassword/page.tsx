"use client";

import { useState, FormEvent } from "react";
import styles from "./reset.module.css";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Password reset successfully!");
    // Later: call your backend API here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>🔑</div>
        <h1 className={styles.title}>Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />

          <div className={styles.actions}>
            <button type="submit" className={styles.continueBtn}>
              Continue
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => (window.location.href = "/login")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage
