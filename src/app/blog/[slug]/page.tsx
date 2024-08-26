import Markdown from "markdown-to-jsx";
import { fetchProjects, getMD } from "@/utils/Markdown";
import { notFound } from "next/navigation";
import TableOfContent from "@/components/TableOfContent";
import moment from "moment";
import TransitionLink from "@/components/TransitionLink";
import { Metadata } from "next";
import PopUpSidebar from "@/components/PopUpSidebar";
import ReadTime from "@/components/ReadTime";

export const revalidate = 60 * 60 * 9;
export const dynamicParams = false;

export async function generateStaticParams() {
  const postMetadata = await fetchProjects();
  return postMetadata.map((i) => {
    const slug = i?.metadata.slug;
    return { slug };
  });
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const slug = props.params.slug;
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
  const slug = props.params.slug;
  const post = await getMD(slug);
  const { prev, next } = await getPrevAndNext(slug);
  if (!post) {
    return notFound();
  }
  return (
    <>
      <PopUpSidebar title="Table of Contents">
        <TableOfContent markdown={post.content} />
      </PopUpSidebar>
      <div className="grid grid-cols-3 justify-items-center px-5">
        {prev ? (
          <TransitionLink className="link" href={`/blog/${prev.metadata.slug}`}>
            <span className="hidden sm:inline">{`<- ${prev.metadata.title}`}</span>
            <span className="inline sm:hidden">{`<-`}</span>
          </TransitionLink>
        ) : (
          <div></div>
        )}
        <TransitionLink className="link" href="/projects">
          Projects
        </TransitionLink>
        {next ? (
          <TransitionLink className="link" href={`/blog/${next.metadata.slug}`}>
            <span className="hidden sm:inline">{`${next.metadata.title} ->`}</span>
            <span className="inline sm:hidden">{`->`}</span>
          </TransitionLink>
        ) : (
          <div></div>
        )}
      </div>
      {/* <div className="my-12 text-center">
        <h1 className="text-3xl font-bold text-primaryText">
          {post.metadata.title}
        </h1>
        <p className="mt-2 text-secondaryText">
          {post.metadata.date
            ? post.metadata.date
            : `${post.metadata.fromdate} - ${post.metadata.todate}`}
        </p>
      </div> */}

      <article className="prose mx-auto mt-8 max-w-[80ch] text-justify dark:prose-invert">
        <ReadTime content={post.content} />
        <Markdown>{post.content}</Markdown>
        <hr />
        <div className="flex justify-between">
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
      </article>
    </>
  );
}
