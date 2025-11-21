"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import styles from "../chat/chat.module.css";

// Force dynamic rendering to avoid static prerender failures when the page
// expects client-only APIs like search params and router navigation.
export const dynamic = "force-dynamic";
export const revalidate = false;

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nextUrl = searchParams.get("next") || "/admin/chat";

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (response.ok) {
      router.push(nextUrl);
      router.refresh();
      return;
    }

    const payload = await response.json().catch(() => null);
    setError(payload?.message || "Credenciales incorrectas");
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className="mb-3">Panel de atención</h1>
        <p className="text-muted mb-4">Ingresa con las credenciales internas.</p>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error ? <div className={styles.errorBox}>{error}</div> : null}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
