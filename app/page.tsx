import { INote, Note } from "./Note";

export default function Page() {
  const notes: INote[] = [
    { id: "1", title: "my first note omegalul", text: "11111111" },
    { id: "2", title: "this shit kinda fun", text: "222222222" },
    { id: "3", title: "i hope i can get good eventually", text: "333333" },
  ];
  const items = notes.map((note) => (
    <Note key={note.id} id={note.id} text={note.text} title={note.title}></Note>
  ));
  return <div className="flex flex-row">{items}</div>;
}
