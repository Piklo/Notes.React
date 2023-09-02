interface LoginErrorProps {
  message: string;
}

export function LoginError({ message }: LoginErrorProps) {
  return (
    <div className="m-3 rounded border border-red-400 bg-red-100 p-2">
      <span className="text-red-600">{message}</span>
    </div>
  );
}
