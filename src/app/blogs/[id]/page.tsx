import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { readBlogPosts } from "@/lib/blogs";

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[id]">): Promise<Metadata> {
  const { id } = await params;
  const posts = await readBlogPosts();
  const post = posts.find((p) => p.id === id);
  return {
    title: post ? `${post.title} | Jack Ning` : "Blog | Jack Ning",
  };
}

export default function BlogPostPage({ params }: PageProps<"/blogs/[id]">) {
  return (
    <article className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <Link
        href="/blogs"
        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← All posts
      </Link>
      <Suspense
        fallback={<p className="mt-8 text-sm text-zinc-500">Loading post…</p>}
      >
        <PostContent params={params} />
      </Suspense>
    </article>
  );
}

async function PostContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const posts = await readBlogPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) {
    notFound();
  }

  return (
    <>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <div className="mt-8 space-y-4">
        {post.content.split("\n").map((paragraph, index) =>
          paragraph.trim() ? (
            <p
              key={index}
              className="leading-8 text-zinc-600 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ) : null
        )}
      </div>
    </>
  );
}
