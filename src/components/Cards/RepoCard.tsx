import Link from "next/link";
import ExpandingPill from "../ExpandingPill";
import SkillPill from "./SkillPill";

export default function RepoCard({ repo }: Readonly<{ repo: IRepo }>) {
  const languagesExpanded = repo.languages.map((lang, i) => (
    <SkillPill key={i} name={lang}></SkillPill>
  ));
  return (
    <Link className="block" href={repo.href}>
      <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg bg-accentbackground ">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-lg font-bold">{repo.name}</h2>
            {repo.archived && <p title="Archived">🔒</p>}
          </div>
          <div className="flex items-center">
            {repo.stars > 0 && <div>✨{repo.stars}</div>}
            {repo.forks > 0 && <div>🍴{repo.forks}</div>}
            {repo.watchers > 0 && <div>👁️{repo.watchers}</div>}
            {repo.issues > 0 && <div>🚩{repo.issues}</div>}
          </div>
        </div>
        {repo.description && <p className="text-sm">{repo.description}</p>}
        {repo.mainLanguage != "" && (
          <span className="flex">
            Language:{" "}
            {languagesExpanded.length <= 1 ? (
              <SkillPill name={repo.mainLanguage}></SkillPill>
            ) : (
              <ExpandingPill
                defaultText={<SkillPill name={repo.mainLanguage}></SkillPill>}
              >
                {languagesExpanded}
              </ExpandingPill>
            )}
          </span>
        )}
      </div>
    </Link>
  );
}
