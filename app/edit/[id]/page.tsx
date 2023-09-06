"use client";

import { useEffect, useState } from "react";
import { GetNoteResponse, GetNoteStatus } from "./GetNoteResponse";
import { UpdateNoteResponse, UpdateNoteStatus } from "./UpdateNoteResponse";

export default function Page({ params }: { params: { id: string } }) {
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(true);
  const [handledSave, setHandledSave] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/getNote?id=${params.id}`, {
          credentials: "include",
        });

        const body = (await res.json()) as GetNoteResponse;

        if (body.note === undefined) {
          if (body.status == GetNoteStatus.Failed) {
            setText("failed to get the note");
          } else if (body.status == GetNoteStatus.NoteNotFound) {
            setText("failed to find the note");
          } else if (body.status == GetNoteStatus.Success) {
            setText("successfully fetched the note but the note is missing?");
          }
          return;
        }

        setText(body.note.value);
      } catch (error) {
        setText("failed to get the note");
      }
    };

    fetchNote();
  }, [params.id]);

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    setHandledSave(false);
    setIsSaving(true);

    try {
      const res = await fetch(`/api/updateNote`, {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ Id: params.id, Value: text }),
        headers: { "Content-Type": "application/json" },
      });

      const body = (await res.json()) as UpdateNoteResponse;

      if (body.status != UpdateNoteStatus.Success) {
        console.error("failed to update the node");
        setIsUpdateSuccess(false);
        return;
      }
      setIsUpdateSuccess(true);
    } catch (error) {
      setIsUpdateSuccess(false);
    } finally {
      setIsSaving(false);
      setHandledSave(true);
    }
  };

  return (
    <div className="flex h-screen  items-center justify-center">
      <div className="w-3/4">
        <div className="w-full">
          <textarea
            className="h-96 w-full rounded border"
            value={text}
            onChange={(x) => setText(x.target.value)}
            required
          ></textarea>
        </div>
        <button
          className="w-full  rounded border bg-gray-50 hover:bg-gray-100"
          onClick={handleSave}
        >
          Save
        </button>

        {!isSaving && !isUpdateSuccess && (
          <UpdateError message="failed to update"></UpdateError>
        )}
        {handledSave && isUpdateSuccess && (
          <UpdateSuccess message="updated the note"></UpdateSuccess>
        )}
      </div>
    </div>
  );
}

export function UpdateError({ message }: { message: string }) {
  return (
    <div className="my-3 rounded border border-red-400 bg-red-100 p-2">
      <span className="text-red-600">{message}</span>
    </div>
  );
}

export function UpdateSuccess({ message }: { message: string }) {
  return (
    <div className="my-3 rounded border border-green-400 bg-green-100 p-2">
      <span className="text-green-600">{message}</span>
    </div>
  );
}
