"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import SuccessMessage from "../messages/SuccessMessage";
import ErrorMessage from "../messages/ErrorMessage";

interface RegisterResponse {
  status: RegisterStatus;
}

enum RegisterStatus {
  Failed,
  Success,
  EmailInUse,
  LoginInUse,
}

export default function Page() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerResult, setRegisterResult] = useState<
    { isSuccess: boolean; message: string } | undefined
  >();
  const router = useRouter();

  const HandleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegistering) {
      return;
    }

    setIsRegistering(true);
    setRegisterResult(undefined);

    try {
      const res = await fetch("api/register", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ login, email, password }),
      });

      const body = (await res.json()) as RegisterResponse;

      switch (body.status) {
        case RegisterStatus.Failed:
          setRegisterResult({
            isSuccess: false,
            message: "Failed to register.",
          });
          break;
        case RegisterStatus.Success:
          setRegisterResult({
            isSuccess: true,
            message: "Successfully registered.",
          });
          router.push("/login");
          break;
        case RegisterStatus.EmailInUse:
          setRegisterResult({
            isSuccess: false,
            message: "Email is already in use.",
          });
          break;
        case RegisterStatus.LoginInUse:
          setRegisterResult({
            isSuccess: false,
            message: "Login is already in use.",
          });
          break;
        default:
          const exhaustiveCheck: never = body.status;
          setRegisterResult({
            isSuccess: false,
            message: "Failed to register, unknown status.",
          });
      }
    } catch (error) {
      setRegisterResult({
        isSuccess: false,
        message: "Failed to register, unknown error.",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="mt-72 flex justify-center">
      <div className="w-72">
        <form onSubmit={HandleRegister} className="rounded border">
          <div className="m-3">
            <label htmlFor="login">Login</label>
            <input
              id="login"
              type="text"
              placeholder="Login"
              className="w-full rounded border p-2"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            ></input>
          </div>
          <div className="m-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full rounded border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="m-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full rounded border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <div className="m-3">
            <input
              type="submit"
              value="Register"
              className="w-full cursor-pointer rounded border p-2 hover:bg-blue-100"
            ></input>
          </div>
          <a href="/login">
            <div className="m-3 rounded border p-2 text-center hover:bg-blue-100">
              Already have an account
            </div>
          </a>
        </form>
        {registerResult?.isSuccess === true && (
          <SuccessMessage message={registerResult.message}></SuccessMessage>
        )}
        {registerResult?.isSuccess === false && (
          <ErrorMessage message={registerResult.message}></ErrorMessage>
        )}
      </div>
    </div>
  );
}
