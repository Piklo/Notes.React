"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ErrorMessage from "../messages/ErrorMessage";
import SuccessMessage from "../messages/SuccessMessage";

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
  const [loginResult, setLoginResult] = useState<
    { message: string; isSuccess: boolean } | undefined
  >();
  const router = useRouter();

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFetching) {
      return;
    }

    setIsFetching(true);
    setLoginResult(undefined);

    try {
      const res = await fetch(`/api/login`, {
        method: "post",
        body: JSON.stringify({ login: login, password: password }),
        headers: { "Content-Type": "application/json" },
      });

      const body = (await res.json()) as LoginResponse;

      if (body.status === LoginStatus.Success) {
        setLoginResult({ isSuccess: true, message: "Successfully logged in." });
        router.push("/");
      } else if (body.status == LoginStatus.UserNotFound) {
        setLoginResult({
          isSuccess: false,
          message: "User not found.",
        });
      } else if (body.status == LoginStatus.WrongPassword) {
        setLoginResult({
          isSuccess: false,
          message: "Wrong password.",
        });
      } else {
        setLoginResult({
          isSuccess: false,
          message: "Failed to login, unknown status.",
        });
      }
    } catch (error) {
      console.error(error);
      setLoginResult({
        isSuccess: false,
        message: "Failed to login, unknown error.",
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
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
              className="w-full cursor-pointer rounded border px-3 py-2 hover:bg-blue-50"
            ></input>
          </div>
          <a href="/register">
            <div className="m-3 rounded border p-3 text-center hover:bg-blue-50">
              new user?
            </div>
          </a>
        </form>
        {loginResult?.isSuccess === true && (
          <SuccessMessage message={loginResult.message}></SuccessMessage>
        )}
        {loginResult?.isSuccess === false && (
          <ErrorMessage message={loginResult.message}></ErrorMessage>
        )}
      </div>
    </div>
  );
}
