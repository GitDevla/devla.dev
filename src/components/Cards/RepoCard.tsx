import { formatTimeAgo } from "@/utils/Date";
import SkillPill from "./SkillPill";
import Link from "../Atoms/Link";

export default function RepoCard({ repo }: Readonly<{ repo: IRepo }>) {
  const languages = Array.from(
    new Set([repo.mainLanguage, ...repo.languages].filter(Boolean)),
  );
  return (
    <Link href={repo.href} external className={"group block h-full min-w-0"}>
      <div className={"card flex h-full flex-col gap-4"}>
        <div className={"flex items-start justify-between gap-3"}>
          <div className={"min-w-0"}>
            <h3
              className={
                "text-lg break-words group-hover:text-primary group-focus-visible:text-primary"
              }
            >
              {repo.name}
            </h3>
            {repo.archived && (
              <span
                className={
                  "mt-2 inline-block rounded border border-border px-2 py-0.5 text-xs text-muted"
                }
              >
                Archived
              </span>
            )}
          </div>
          <span
            aria-hidden={true}
            className={"shrink-0 text-muted group-hover:text-primary"}
          >
            ↗
          </span>
          <span className={"sr-only"}>(opens in a new tab)</span>
        </div>
        <p className={"line-clamp-3 text-sm text-muted"}>
          {repo.description || "No description provided."}
        </p>
        <div className={"mt-auto space-y-4"}>
          {languages.length > 0 && (
            <div className={"flex flex-wrap gap-y-2"}>
              {languages.map((language) => (
                <SkillPill key={language} name={language} />
              ))}
            </div>
          )}
          <div
            className={
              "flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted"
            }
          >
            <p>Updated {formatTimeAgo(repo.updated_at)}</p>
            {repo.stars > 0 && (
              <span>
                <span aria-hidden={true}>☆ </span>
                {repo.stars} {repo.stars === 1 ? "star" : "stars"}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
