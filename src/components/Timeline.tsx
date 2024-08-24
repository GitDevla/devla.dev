import { readStatic } from "@/utils/ReadJSON";

export default async function Timeline() {
  let education: any[] = await readStatic("education.json");
  education = education.sort((a, b) => a.from - b.from).reverse();

  return (
    <ol className="relative border-s border-secondaryText">
      {education.map((item, i) => (
        <li className="mb-7 ms-4" key={i}>
          <div className="absolute -start-1.5 mt-2 h-3 w-3 rounded-full bg-secondaryText"></div>
          <time className="mb-1 text-sm leading-none text-secondaryText">
            {item.from} - {item.to}
          </time>
          <h3 className="font-semibold text-lg text-primaryText">
            {item.location}
          </h3>
          <p className="mb-3 whitespace-pre-wrap text-secondaryText">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
