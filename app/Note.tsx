export interface INote {
  id: string;
  title: string;
  text: string;
}

export function Note({ id, title, text }: INote) {
  return (
    <div className="container m-2 rounded border border-red-600">
      <div className="bg-fuchsia-200">{title}</div>
      <div>{text}</div>
    </div>
  );
}
