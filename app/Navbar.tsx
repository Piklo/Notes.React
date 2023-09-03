export default function Navbar() {
  return (
    <div className="flex">
      <NavbarButton link="/" value="Home"></NavbarButton>
      <NavbarButton link="/login" value="Login"></NavbarButton>
      <NavbarButton link="/newNote" value="Create new note"></NavbarButton>
    </div>
  );
}

function NavbarButton({ link, value }: { link: string; value: string }) {
  return (
    <a href={`${link}`}>
      <div className="rounded border p-2 hover:bg-gray-200">{value}</div>
    </a>
  );
}
