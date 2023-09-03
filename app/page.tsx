"use client";

import { useEffect, useState } from "react";
import { NoteDto, Note } from "./Note";
import { useRouter } from "next/navigation";

interface GetNotesResponse {
  status: GetNotesStatus;
  notes: NoteDto[];
}

enum GetNotesStatus {
  Failed,
  Success,
}

export default function Page() {
  const [notes, setNotes] = useState([] as NoteDto[]);
  const router = useRouter();

  const removeNote = (id: string) => {
    const newNotes = notes.filter((x) => {
      return x.id !== id;
    });

    setNotes(newNotes);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const asd = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getNotes`, {
          credentials: "include",
        });
        const json = (await asd.json()) as GetNotesResponse;
        setNotes(json.notes);
      } catch (error) {
        router.push("/login");
      }
    };

    fetchData();
  }, [router]);

  const items = notes.map((note) => (
    <Note key={note.id} note={note} removeNote={removeNote}></Note>
  ));
  return <div className="grid grid-cols-3 gap-2 p-2">{items}</div>;
}
