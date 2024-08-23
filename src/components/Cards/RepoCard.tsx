import Link from "next/link";
import ExpandingPill from "../ExpandingPill";
import SkillPill from "./SkillPill";
import { formatTimeAgo } from "@/utils/Date";

export default function RepoCard({ repo }: Readonly<{ repo: IRepo }>) {
  const languagesExpanded = repo.languages
    .filter((lang) => lang != repo.mainLanguage)
    .splice(0, 4)
    .map((lang, i) => <SkillPill key={i} name={lang}></SkillPill>);
  return (
    <Link href={repo.href}>
      <div className="card relative flex h-full flex-col justify-between rounded-lg pb-6">
        <div className="absolute right-2 flex items-center">
          {repo.stars > 0 && <div>✨{repo.stars}</div>}
        </div>
        <div className="flex items-center">
          <h3 className="line-clamp-1 text-lg font-bold">{repo.name}</h3>
          {repo.archived && (
            <p className="ml-1 text-secondaryText">(Archived)</p>
          )}
        </div>

        <div className="line-clamp-2 text-base text-secondaryText">
          {repo.description ? (
            <p className="">{repo.description}</p>
          ) : (
            <p className="italic">No description was given</p>
          )}
        </div>
        <div>
          <p className="mt-3 text-xs text-secondaryText">
            Last Updated: {formatTimeAgo(repo.updated_at)}
          </p>
        </div>
        <div className="absolute -bottom-3 left-2 flex w-full">
          {repo.mainLanguage != "" && (
            <ExpandingPill
              defaultText={<SkillPill name={repo.mainLanguage}></SkillPill>}
            >
              {languagesExpanded}
            </ExpandingPill>
          )}
        </div>
      </div>
    </Link>
  );
}
