import Link from "@/components/Atoms/Link";

export default function BlogNavBar({ prev, next }: { prev: IMarkdown | null, next: IMarkdown | null }) {
    return <div className={"grid grid-cols-3 justify-items-center px-5"}>
        <div>
            {prev && (
                <Link
                    className={"link"}
                    href={`/blog/${prev.metadata.slug}`}
                >
                    <span
                        className={"hidden sm:inline"}
                    >{`<- ${prev.metadata.title}`}</span>
                    <span className={"inline sm:hidden"}>{"<-"}</span>
                </Link>
            )}
        </div>
        <div>
            <Link className={"link"} href={"/projects"}>
                Projects
            </Link>
        </div>
        <div>
            {next && (
                <Link
                    className={"link"}
                    href={`/blog/${next.metadata.slug}`}
                >
                    <span
                        className={"hidden sm:inline"}
                    >{`${next.metadata.title} ->`}</span>
                    <span className={"inline sm:hidden"}>{"->"}</span>
                </Link>
            )}
        </div>
    </div>;
}
