import { readStatic } from "@/utils/ReadJSON";

export default async function Timeline() {
  let education: any[] = await readStatic("education.json");
  education = education.sort((a, b) => a.from - b.from).reverse();

  return (
    <ol className={"relative border-s border-border"}>
      {education.map((item, i) => (
        <li className={"ms-4 mb-6"} key={i}>
          <div
            className={"absolute -start-1.5 mt-2 h-3 w-3 rounded-full bg-muted"}
          />
          <time className={"mb-1 text-sm leading-none text-muted"}>
            {item.from} - {item.to}
          </time>
          <h3 className={"text-lg font-semibold text-text"}>{item.location}</h3>
          <p className={"mb-4 whitespace-pre-wrap text-muted"}>
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
