import { NoteProps, Note } from "./Note";

export default function Page() {
  const notes: NoteProps[] = [
    { id: "1", title: "my first note omegalul", text: "11111111" },
    { id: "2", title: "this shit kinda fun", text: "222222222" },
    { id: "3", title: "i hope i can get good eventually", text: "333333" },
    { id: "4", title: "how do i exit vim", text: "i have absolutely no idea" },
    { id: "5", title: "tom is okay", text: "sometimes anyway" },
    { id: "6", title: "what do i do now", text: "im kinda out of ideas" },
    { id: "7", title: "123123", text: "312322" },
  ];
  const items = notes.map((note) => (
    <Note key={note.id} id={note.id} text={note.text} title={note.title}></Note>
  ));
  return <div className="grid grid-cols-3 gap-2 p-2">{items}</div>;
}
