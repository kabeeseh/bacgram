export default function ({
  error,
  className,
}: {
  error: String;
  className?: String;
}) {
  return <h1 className={`text-red-500 text-center ${className}`}>{error}</h1>;
}
