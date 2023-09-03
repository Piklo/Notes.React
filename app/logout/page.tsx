"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch(`/api/logout`, {
          credentials: "include",
          method: "post",
        });

        router.push("/");
      } catch (error) {
        console.error(error);
      }
    };

    logout();
  }, [router]);

  return <div></div>;
}
