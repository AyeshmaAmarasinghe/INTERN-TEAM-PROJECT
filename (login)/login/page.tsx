"use client";

import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Username: ${username} \nPassword: ${password} \nRemember Me: ${rememberMe}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image
          src="/logo-highQulity(noBack).png"
          alt="Saegis Campus"
          width={125}
          height={125}
          className={styles.logo}
        />
        <h2 className="textLable">Welcome to Saegis Campus</h2>

        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.inputGray}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputGray}
          />

          <div className={styles.options}>
            <label className={styles.remember}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <Link href="/forgotpassword">Forgot Password?</Link>
          </div>

          <button type="submit" className={styles.loginBtn}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage
