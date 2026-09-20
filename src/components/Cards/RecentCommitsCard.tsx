import Hover from "../Atoms/Hover";
import Link from "../Atoms/Link";

export default function RecentCommitsCard({
  commits,
  languages,
}: Readonly<IRecentCommitActivity>) {
  if (commits.length === 0) return null;

  const totalBytes = languages.reduce((acc, lang) => acc + lang.bytes, 0);
  return (
    <section
      className={"mt-4 flex flex-col gap-3"}
      aria-labelledby={"recent-commits"}
    >
      <h2
        id={"recent-commits"}
        className={"subheader mb-0 flex items-center gap-2"}
      >
        <svg
          className={"size-5 text-primary"}
          viewBox={"0 0 24 24"}
          fill={"none"}
          stroke={"currentColor"}
          strokeWidth={2}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          aria-hidden={true}
        >
          <path
            d={
              "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
            }
          />
        </svg>
        Recent Commits
      </h2>
      <ul className={"flex flex-col gap-1 font-mono text-sm"}>
        {commits.map((commit) => (
          <li
            key={commit.href}
            className={"flex items-baseline justify-between gap-4"}
          >
            <Link href={commit.href} external className={"truncate"}>
              <span className={"font-bold text-primary"}>{commit.repo}:</span>{" "}
              <span className={"text-muted"}>{commit.message}</span>
            </Link>
            <span className={"whitespace-nowrap"}>
              <span className={"text-success"}>+{commit.additions}</span>
              <span className={"text-muted"}> / </span>
              <span className={"text-danger"}>-{commit.deletions}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className={"flex items-center gap-3"}>
        <Link
          href={`https://github.com/${process.env.GITHUB_ID}`}
          external
          className={"link text-sm whitespace-nowrap"}
        >
          View on GitHub
        </Link>
        <div className={"flex h-2 w-full"}>
          {languages.map((lang) => (
            <div
              key={lang.name}
              className={"h-full first:rounded-l-full last:rounded-r-full"}
              style={{
                width: `${(lang.bytes / totalBytes) * 100}%`,
                backgroundColor: lang.color,
              }}
            >
              <Hover
                className={"!block size-full"}
                hoverText={`${lang.name} ${Math.round((lang.bytes / totalBytes) * 100)}%`}
              >
                <div className={"size-full"} />
              </Hover>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
