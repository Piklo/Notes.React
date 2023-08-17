export interface INote {
  id: string;
  title: string;
  text: string;
}

export function Note({ id, title, text }: INote) {
  return (
    <div className="container m-2 rounded border border-red-600">
      <div className="flex flex-row bg-fuchsia-200">
        <div className="container p-1">{title}</div>
        <button className="self-end rounded bg-blue-500 p-1">Edit</button>
      </div>
      <div className="p-1">{text}</div>
    </div>
  );
}
