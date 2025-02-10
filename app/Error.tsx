export default function Error({
  error,
  className,
}: {
  error: string;
  className?: string;
}) {
  return <h1 className={`text-red-500 text-center ${className}`}>{error}</h1>;
}
