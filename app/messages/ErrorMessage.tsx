export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded border border-red-400 bg-red-100 p-3">
      <span>{message}</span>
    </div>
  );
}
