export interface UpdateNoteResponse {
  status: UpdateNoteStatus;
}

export enum UpdateNoteStatus {
  Failed,
  Success,
  ZeroAffected,
}
