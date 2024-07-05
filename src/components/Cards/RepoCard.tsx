import Link from "next/link";

export default function RepoCard({ repo }: Readonly<{ repo: IRepo }>) {
  return (
    <Link className="block" href={repo.href}>
      <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg bg-accentbackground-light dark:bg-accentbackground-dark">
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
        <div>
          {repo.languages.map((lang, i) => (
            <span
              key={i}
              className="text-xs bg-gray-200 dark:bg-gray-800 p-1 rounded-lg mr-1"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
