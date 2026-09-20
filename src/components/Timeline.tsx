import { readStatic } from "@/utils/ReadJSON";

type TimelineEntry = {
  from: string;
  to: string;
  title: string;
  description?: string;
};

type TimelineGroup = {
  location: string;
  link?: string;
  description?: string;
  entries: TimelineEntry[];
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function sortKey(date: string) {
  if (date === "present") return "9999-99";
  const [year, month] = date.split("-");
  return `${year}-${month ?? "00"}`;
}

function formatDate(date: string) {
  if (date === "present") return "present";
  const [year, month] = date.split("-");
  if (!month) return year;
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

function latest(group: TimelineGroup) {
  return group.entries.reduce(
    (max, e) => (sortKey(e.from) > max ? sortKey(e.from) : max),
    "",
  );
}

export default async function Timeline({ source }: { source: string }) {
  const groups: TimelineGroup[] = await readStatic(source);
  groups.sort((a, b) => latest(b).localeCompare(latest(a)));
  for (const group of groups)
    group.entries.sort((a, b) =>
      sortKey(b.from).localeCompare(sortKey(a.from)),
    );

  return (
    <ol className={"relative border-s border-border"}>
      {groups.map((group) => (
        <li className={"ms-4 mb-6"} key={group.location}>
          <div
            className={"absolute -start-1.5 mt-2 h-3 w-3 rounded-full bg-muted"}
          />
          <h3 className={"text-lg font-semibold text-text"}>
            {group.link ? (
              <a
                className={"link"}
                href={group.link}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {group.location}
              </a>
            ) : (
              group.location
            )}
          </h3>
          {group.description && (
            <p className={"mt-1 whitespace-pre-wrap text-muted"}>
              {group.description}
            </p>
          )}
          <div className={"relative mt-3"}>
            <div
              className={
                "absolute -start-4 top-0 bottom-0 w-6 rounded-e-xl border-e border-t border-b border-border/60"
              }
            />
            <ul className={"space-y-4 ps-8"}>
              {group.entries.map((entry) => (
                <li className={"relative"} key={entry.title}>
                  <span
                    className={
                      "absolute -start-7 top-1.5 h-2 w-2 rounded-full border border-border bg-canvas"
                    }
                  />
                  <time className={"text-sm leading-none text-muted"}>
                    {formatDate(entry.from)} - {formatDate(entry.to)}
                  </time>
                  <p className={"font-medium text-text"}>{entry.title}</p>
                  {entry.description && (
                    <p
                      className={"mt-1 text-sm whitespace-pre-wrap text-muted"}
                    >
                      {entry.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
