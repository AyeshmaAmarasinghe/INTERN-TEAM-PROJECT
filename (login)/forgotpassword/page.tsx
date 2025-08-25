"use client";

import { useState, FormEvent } from "react";
import styles from "./forgot.module.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Reset link sent to: ${email}`);
    // Later you can call your backend API here
    // fetch("/api/forgot-password", { method: "POST", body: JSON.stringify({ email }) })
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Forgot Password</h1>
        <p className={styles.text}>
          Enter your registered email address and we will send you a reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your e-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Reset my Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage
