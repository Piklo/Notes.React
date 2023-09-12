import { useState } from "react";
import ErrorMessage from "./messages/ErrorMessage";

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
  const [deleteResult, setDeleteResult] = useState<
    { isSuccess: boolean; message: string } | undefined
  >();

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/removeNote`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Id: note.id }),
      });

      const body = (await res.json()) as RemoveNoteResponse;

      switch (body.status) {
        case RemoveNoteStatus.Failed:
          setDeleteResult({
            isSuccess: false,
            message: "Failed to delete the note.",
          });
          break;
        case RemoveNoteStatus.Success:
          setDeleteResult({
            isSuccess: true,
            message: "Successully deleted the note.",
          });
          break;
        case RemoveNoteStatus.ZeroAffected:
          setDeleteResult({
            isSuccess: false,
            message: "Failed to find the note.",
          });
          break;
        default:
          const exhaustiveCheck: never = body.status;
      }

      if (body.status === RemoveNoteStatus.Success) {
        removeNote(note.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container h-fit rounded border border-red-600">
      <textarea
        className="disabled h-36 w-full whitespace-pre-wrap break-words p-1"
        disabled
        value={note.value}
      ></textarea>
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
      {deleteResult?.isSuccess === false && (
        <ErrorMessage message={deleteResult.message}></ErrorMessage>
      )}
    </div>
  );
}
