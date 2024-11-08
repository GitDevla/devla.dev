import { GitHistory } from "@/services/Git";

export default function GitHistorySection({ history }: { history: GitHistory[] }) {
    return <details>
        <summary className={"text-lg"}>History of changes</summary>
        {history.length == 0 ? (
            <span>No changes were made so far</span>
        ) : (
            <div className={"max-h-96 overflow-scroll"}>
                {history.map((i, index) => (
                    <div key={index}>
                        <h3>Changes made in {i.date}</h3>
                        {i.additions.length > 0 && (
                            <>
                                <h4>Additions</h4>
                                <ul>
                                    {i.additions.map((i, index) => (
                                        <li key={index} className={"text-green-300"}>
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {i.deletions.length > 0 && (
                            <>
                                <h4>Deletions</h4>
                                <ul>
                                    {i.deletions.map((i, index) => (
                                        <li key={index} className={"text-red-300"}>
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {i.changes.length > 0 && (
                            <>
                                <h4>Changes</h4>
                                <ul>
                                    {i.changes.map((i, index) => (
                                        <li key={index} className={"text-blue-300"}>
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                ))}
            </div>
        )}
    </details>;
}
