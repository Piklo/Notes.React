"use client";

import { useState } from "react";

export default function Page() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isFetching) {
            return;
          }

          setIsFetching(true);
          try {
            var res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
              method: "post",
              body: JSON.stringify({ login: login, password: password }),
              headers: { "Content-Type": "application/json" },
            });
            console.dir(res);
            console.dir(await res.json());
          } catch (error) {
            console.error("failed to login", error);
          } finally {
            setIsFetching(false);
            console.log("done fetching");
          }
        }}
        className="rounded border"
      >
        <div className="mx-3 my-4">
          <label>Login</label>
          <input
            id="login"
            type="text"
            placeholder="Login"
            className="w-full rounded border px-3 py-2"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></input>
        </div>
        <div className="mx-3 mb-4">
          <label>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full rounded border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="mx-3 mb-4">
          <input
            type="submit"
            value="Login"
            className="w-full rounded border px-3 py-2 hover:bg-blue-50"
          ></input>
        </div>
      </form>
    </div>
  );
}
