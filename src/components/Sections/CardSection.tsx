export default function CardSection({
  children,
  title,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="my-10">
      <h2 className="mb-3 text-1xl font-bold uppercase">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
        {children}
      </div>
    </section>
  );
}
