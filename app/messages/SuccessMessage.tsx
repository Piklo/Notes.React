export default function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="rounded border border-green-400 bg-green-100 p-3">
      <span>{message}</span>
    </div>
  );
}
