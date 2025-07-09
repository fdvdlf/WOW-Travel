import { AboutThree } from "@/components/about/AboutThree";
import { AnimalTwo } from "@/components/animal/AnimalTwo";
import { BannerThree } from "@/components/banner/BannerThree";
import { BlogThree } from "@/components/blogs/BlogThree";
import { BrandThree } from "@/components/brands/BrandThree";
import { ChooseOne } from "@/components/choose/ChooseOne";
import { CtaOne } from "@/components/cta/CtaOne";
import { DiscoverOne } from "@/components/discover/DiscoverOne";
import { TestimonialThree } from "@/components/testimonial/TestimonialThree";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function HomeThree() {
  return (
    <Layout header={3} footer={3}>
      {/* banner */}
      <BannerThree />

      {/* about */}
      <AboutThree />

      {/* brand */}
      <BrandThree />

      {/* animal */}
      <AnimalTwo />

      {/* choose */}
      <ChooseOne />

      {/* discover */}
      <DiscoverOne />

      {/* cta */}
      <CtaOne />

      {/* testimonial */}
      <TestimonialThree />

      {/* blog */}
      <BlogThree />
    </Layout>
  );
}
