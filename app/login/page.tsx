"use client";
import { FormEvent, useState } from "react";
import { LoginError } from "./LoginError";
import { useRouter } from "next/navigation";

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
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFetching) {
      return;
    }

    setIsFetching(true);
    setErrorMessage(undefined);

    try {
      const res = await fetch(`/api/login`, {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ login: login, password: password }),
        headers: { "Content-Type": "application/json" },
      });

      const body = (await res.json()) as LoginResponse;

      if (body.status === LoginStatus.Success) {
        router.push("/");
      } else if (body.status == LoginStatus.UserNotFound) {
        setErrorMessage("user not found");
      } else if (body.status == LoginStatus.WrongPassword) {
        setErrorMessage("wrong password");
      } else {
        setErrorMessage("failed to login");
      }
    } catch (error) {
      setErrorMessage("failed to login");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={HandleSubmit} className="mt-72 rounded border">
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

        {errorMessage !== undefined && (
          <LoginError message={errorMessage}></LoginError>
        )}
      </form>
    </div>
  );
}
