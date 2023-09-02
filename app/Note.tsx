export interface NoteProps {
  id: string;
  value: string;
}

export function Note({ value: text }: NoteProps) {
  return (
    <div className="container rounded border border-red-600">
      <div className="flex flex-row bg-fuchsia-200">
        <button className="self-end rounded bg-blue-500 p-1">Edit</button>
      </div>
      <div className="p-1">{text}</div>
    </div>
  );
}
