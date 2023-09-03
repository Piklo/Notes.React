import { NoteDto } from "@/app/Note";

export interface GetNoteResponse {
  status: GetNoteStatus;
  note: NoteDto | undefined;
}

export enum GetNoteStatus {
  Failed,
  Success,
  NoteNotFound,
}
