export interface NoteProps {
  id: string;
  value: string;
}

export function Note({ value: text }: NoteProps) {
  return (
    <div className="container rounded border border-red-600">
      <div className="p-1">{text}</div>
      <div>
        <button className="w-1/2 self-end  bg-blue-300 p-1 hover:bg-blue-400">
          Edit
        </button>
        <button className="w-1/2 self-end  bg-red-300 p-1 hover:bg-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}
