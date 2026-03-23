import { BlogComments } from "@/components/blogs/BlogComments";
import { BlogDetailsContent } from "@/components/blogs/BlogDetailsContent";
import { getAllBlogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import { Layout } from "@/layouts/Layout";
import { LayoutBlog } from "@/layouts/LayoutBlog";
import { notFound } from "next/navigation";
import React from "react";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    id: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = getBlogPostBySlug(params.id);

  if (!post) {
    return {
      title: "Articulo | WOW Travel",
    };
  }

  return {
    title: `${post.title} | WOW Travel`,
    description: post.excerpt,
  };
}

export default function Blog({ params }) {
  const post = getBlogPostBySlug(params.id);

  if (!post) {
    notFound();
  }

  return (
    <Layout
      breadcrumbTitle="Noticias y articulos"
      breadcrumbSubtitle={"Detalle del articulo"}
      mainClass="nothing"
    >
      <LayoutBlog currentArticleSlug={post.slug}>
        <BlogDetailsContent post={post} />
        <BlogComments post={post} />
      </LayoutBlog>
    </Layout>
  );
}
