import Markdown from "markdown-to-jsx";
import moment from "moment";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Atoms/Link";
import PopUpSidebar from "@/components/PopUpSidebar";
import ReadTime from "@/components/ReadTime";
import TableOfContent from "@/components/TableOfContent";
import { getHistory } from "@/services/Git";
import { fetchProjects, getMD } from "@/utils/Markdown";

export const revalidate = 86400; // 60 * 60 * 24

export async function generateStaticParams() {
  const postMetadata = await fetchProjects();
  return postMetadata.map((i) => {
    const slug = i?.metadata.slug;
    return { slug };
  });
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const slug = (await props.params).slug;
  return {
    title: slug,
  };
}

async function getPrevAndNext(slug: string) {
  const posts = await fetchProjects();
  const index = posts.findIndex((i) => i?.metadata.slug === slug);
  const prev = posts[index - 1];
  const next = posts[index + 1];
  return { prev, next };
}

export default async function BlogPage(props: any) {
  const slug = (await props.params).slug;
  const post = await getMD(slug);
  const { prev, next } = await getPrevAndNext(slug);
  if (!post) {
    return notFound();
  }
  const history = await getHistory(
    process.env.STATIC_PATH + "/blogs/" + slug + ".md",
  );
  if (!post.metadata.visible) return notFound();
  return (
    <>
      <PopUpSidebar title={"Table of Contents"}>
        <TableOfContent markdown={post.content} />
      </PopUpSidebar>
      <div className={"grid grid-cols-3 justify-items-center px-5"}>
        {prev ? (
          <Link
            className={"link"}
            href={`/blog/${prev.metadata.slug}`}
          >
            <span
              className={"hidden sm:inline"}
            >{`<- ${prev.metadata.title}`}</span>
            <span className={"inline sm:hidden"}>{"<-"}</span>
          </Link>
        ) : (
          <div />
        )}
        <Link className={"link"} href={"/projects"}>
          Projects
        </Link>
        {next ? (
          <Link
            className={"link"}
            href={`/blog/${next.metadata.slug}`}
          >
            <span
              className={"hidden sm:inline"}
            >{`${next.metadata.title} ->`}</span>
            <span className={"inline sm:hidden"}>{"->"}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <article
        className={
          "prose mx-auto mt-8 max-w-[80ch] text-justify dark:prose-invert"
        }
      >
        <ReadTime content={post.content} />
        <Markdown>{post.content}</Markdown>
        <hr />
        <div className={"flex justify-between"}>
          <span>
            Created:{" "}
            {moment
              .utc(post.metadata.created)
              .local()
              .startOf("days")
              .fromNow()}
          </span>
          <span>
            Last Updated:{" "}
            {moment
              .utc(post.metadata.lastUpdated)
              .local()
              .startOf("days")
              .fromNow()}
          </span>
        </div>
        <details>
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
        </details>
      </article>
    </>
  );
}
