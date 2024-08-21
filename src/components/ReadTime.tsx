export default function ReadTime({ content }: { content: string }) {
  const words = content.split(" ").length;
  const minutes = Math.ceil(words / 200);
  return (
    <span className="text-sm italic text-secondaryText">
      {minutes} minute read
    </span>
  );
}
