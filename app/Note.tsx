import { useState } from "react";

export interface NoteDto {
  id: string;
  value: string;
}

interface RemoveNoteResponse {
  status: RemoveNoteStatus;
}

enum RemoveNoteStatus {
  Failed,
  Success,
  ZeroAffected,
}

export function Note({
  note,
  removeNote,
}: {
  note: NoteDto;
  removeNote: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    console.log(note.id);
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/removeNote`, {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Id: note.id }),
      });

      var body = (await res.json()) as RemoveNoteResponse;

      console.dir(body);

      if (body.status != RemoveNoteStatus.Success) {
        return;
      }

      removeNote(note.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container h-fit rounded border border-red-600">
      <div className="line-clamp-5 break-words p-1">{note.value}</div>
      <div className="flex w-full">
        <a
          href={`edit/${note.id}`}
          className="w-1/2 bg-blue-300 p-1 text-center hover:bg-blue-400"
        >
          <div>Edit</div>
        </a>
        <button
          className="w-1/2 bg-red-300 p-1 hover:bg-red-400"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
