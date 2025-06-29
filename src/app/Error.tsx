export default function Error({
  className,
  error,
}: {
  className?: string;
  error: string;
}) {
  return (
    <h1 className={`text-red-500 text-center text-[1.5rem] ${className}`}>
      {error}
    </h1>
  );
}
