"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddNoteResponse {
  status: AddNoteStatus;
}

enum AddNoteStatus {
  Failed,
  Success,
}

export default function Page() {
  const [text, setText] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const createNote = async () => {
    console.log(text);

    if (isAdding) {
      return;
    }

    setIsAdding(true);

    try {
      const res = await fetch(`/api/addNote`, {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ value: text }),
      });

      const body = (await res.json()) as AddNoteResponse;

      if (body.status != AddNoteStatus.Success) {
        setIsFailed(true);
        return;
      }

      router.push("/");
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-3/4">
        <textarea
          className="h-96 w-full rounded border border-black"
          value={text}
          onChange={(x) => setText(x.target.value)}
        ></textarea>
        <button
          className="w-full  rounded border bg-gray-100 hover:bg-gray-200"
          onClick={createNote}
        >
          Save
        </button>
        {isFailed && (
          <NewNoteError message="failed to add message"></NewNoteError>
        )}
      </div>
    </div>
  );
}

export function NewNoteError({ message }: { message: string }) {
  return (
    <div className="my-3 rounded border border-red-400 bg-red-100 p-2">
      <span className="text-red-600">{message}</span>
    </div>
  );
}
