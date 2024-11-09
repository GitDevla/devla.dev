import Markdown from "markdown-to-jsx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLD from "@/components/Atoms/JsonLD";
import PopUpSidebar from "@/components/PopUpSidebar";
import ReadTime from "@/components/ReadTime";
import TableOfContent from "@/components/TableOfContent";
import { getHistory } from "@/services/Git";
import { formatTimeAgo } from "@/utils/Date";
import { fetchProjects, getMD } from "@/utils/Markdown";
import createMetadata from "@/utils/Metadata";
import BlogNavBar from "./BlogNavBar";
import GitHistorySection from "./GitHistorySection";

export const revalidate = 86400; // 60 * 60 * 24

function generateJsonLd(blog: IMarkdown) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.metadata.title,
    description: blog.metadata.subtitle,
    author: {
      "@type": "Person",
      name: "David Pataki"
    },
    datePublished: blog.metadata.created,
    dateModified: blog.metadata.lastUpdated,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://devla.dev/blog/" + blog.metadata.slug
    },
    image: {
      "@type": "ImageObject",
      url: blog.metadata.coverImage,
    }
  };
}



export async function generateStaticParams() {
  const postMetadata = await fetchProjects();
  return postMetadata.map((i) => {
    const slug = i?.metadata.slug;
    return { slug };
  });
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const slug = (await props.params).slug;
  const post = await getMD(slug);
  return createMetadata({
    title: slug,
    description: post?.metadata.subtitle || "",
    keywords: post?.metadata.tags,
  });
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
      <Image
        src={post.metadata.coverImage ?? ""}
        alt={post.metadata.title}
        width={800}
        height={400}
        className={"absolute top-0 left-0 right-0 w-full h-[384px] overflow-hidden -z-10 blur opacity-65 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0)_100%)] object-cover object-center"}
      />
      <PopUpSidebar title={"Table of Contents"}>
        <TableOfContent markdown={post.content} />
      </PopUpSidebar>
      <BlogNavBar prev={prev} next={next} />

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
            {formatTimeAgo(post.metadata.created)}
          </span>
          <span>
            Last Updated:{" "}
            {formatTimeAgo(post.metadata.lastUpdated)}
          </span>
        </div>
        <GitHistorySection history={history} />
      </article>
      <JsonLD json={generateJsonLd(post)} />
    </>
  );
}
