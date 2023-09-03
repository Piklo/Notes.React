"use client";
import { FormEvent, useState } from "react";
import { LoginError } from "./LoginError";
import { redirect, useRouter } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

interface LoginResponse {
  status: LoginStatus;
}

enum LoginStatus {
  Failed,
  Success,
  WrongPassword,
  UserNotFound,
}

export default function Page() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFetching) {
      return;
    }

    setIsFetching(true);

    try {
      var res = await fetch(`/api/login`, {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ login: login, password: password }),
        headers: { "Content-Type": "application/json" },
      });
      console.dir(res);
      const body = (await res.json()) as LoginResponse;
      console.dir(body);
      if (body.status === LoginStatus.Success) {
        router.push("/");
      }
    } catch (error) {
      setErrorMessage("failed to login");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={HandleSubmit} className="rounded border">
        <div className="mx-3 my-4">
          <label htmlFor="login">Login</label>
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
          <label htmlFor="password">Password</label>
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

        {errorMessage != "" && <LoginError message={errorMessage}></LoginError>}
      </form>
    </div>
  );
}
