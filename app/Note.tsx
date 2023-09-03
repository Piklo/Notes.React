export interface NoteDto {
  id: string;
  value: string;
}

export function Note({ id, value: text }: NoteDto) {
  return (
    <div className="container rounded border border-red-600">
      <div className="p-1">{text}</div>
      <div className="flex w-full">
        <a
          href={`edit/${id}`}
          className="w-1/2 bg-blue-300 p-1 text-center hover:bg-blue-400"
        >
          <div>Edit</div>
        </a>
        <button className="w-1/2 bg-red-300 p-1 hover:bg-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}
