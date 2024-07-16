import Link from "next/link";
import ExpandingPill from "../ExpandingPill";
import SkillPill from "./SkillPill";
import moment from "moment";

export default function RepoCard({ repo }: Readonly<{ repo: IRepo }>) {
  const languagesExpanded = repo.languages
    .slice(1, 5)
    .map((lang, i) => <SkillPill key={i} name={lang}></SkillPill>);
  return (
    <Link href={repo.href}>
      <div className="border-secondaryText border p-4 pb-6 rounded-lg h-full flex flex-col justify-between relative">
        <div className="absolute right-2 flex items-center">
          {repo.stars > 0 && <div>✨{repo.stars}</div>}
        </div>
        <div className="flex items-center">
          <h2 className="text-lg font-bold line-clamp-1">{repo.name}</h2>
          {repo.archived && (
            <p className="ml-1 text-secondaryText">(Archived)</p>
          )}
        </div>

        <div className="line-clamp-1 h-[1lh]">
          {repo.description ? (
            <p className="text-sm text-secondaryText">{repo.description}</p>
          ) : (
            <p className="text-sm text-secondaryText font-thin italic">
              No description was given
            </p>
          )}
        </div>
        <div>
          <p>
            Last Updated:{" "}
            {moment.utc(repo.updated_at).local().startOf("seconds").fromNow()}
          </p>
        </div>
        <div className="flex absolute -bottom-3 left-2 w-full">
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
