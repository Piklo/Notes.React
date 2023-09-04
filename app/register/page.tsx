"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

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
  const [registerErrorMessage, setRegisterErrorMessage] = useState<
    string | null
  >();
  const router = useRouter();

  const HandleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegistering) {
      return;
    }

    setIsRegistering(true);
    setRegisterErrorMessage(null);

    try {
      const res = await fetch("api/register", {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ login, email, password }),
      });

      const body = (await res.json()) as RegisterResponse;

      if (body.status == RegisterStatus.Success) {
        router.push("/login");
      } else if (body.status == RegisterStatus.EmailInUse) {
        setRegisterErrorMessage("Email is already in use");
      } else if (body.status == RegisterStatus.LoginInUse) {
        setRegisterErrorMessage("Login is already in use");
      } else if (body.status == RegisterStatus.Failed) {
        setRegisterErrorMessage("Failed to register");
      } else {
        setRegisterErrorMessage("Unknown register error");
      }
    } catch (error) {
      setRegisterErrorMessage("Unknown register error");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="mt-72 flex justify-center">
      <div className="w-72">
        <form className="w-full rounded border p-3" onSubmit={HandleRegister}>
          <div className="pb-1">
            <label htmlFor="login">Login</label>
          </div>
          <div>
            <input
              id="login"
              type="text"
              className="w-full rounded border p-2"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            ></input>
          </div>
          <div className="py-2 pb-1">
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              id="email"
              type="email"
              className="w-full rounded border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="py-2 pb-1">
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input
              id="password"
              type="password"
              className="w-full rounded border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="py-2 pb-1">
            <input
              type="submit"
              className="w-full cursor-pointer rounded border p-2 hover:bg-blue-50"
            ></input>
          </div>
        </form>

        {registerErrorMessage != null && (
          <RegisterError message={registerErrorMessage}></RegisterError>
        )}
      </div>
    </div>
  );
}

const RegisterError = ({ message }: { message: string }) => {
  return (
    <div className="my-2 w-full rounded border bg-red-300 p-2">{message}</div>
  );
};
