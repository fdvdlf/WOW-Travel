import { AboutTwo } from "@/components/about/AboutTwo";
import { AnimalShopOne } from "@/components/animal/AnimalShopOne";
import { BannerTwo } from "@/components/banner/BannerTwo";
import { BlogTwo } from "@/components/blogs/BlogTwo";
import { BrandTwo } from "@/components/brands/brandTwo";
import { CounterTwo } from "@/components/counter/CounterTwo";
import { IntroducingOne } from "@/components/intro/IntroducingOne";
import { TeamTwo } from "@/components/teams/TeamTwo";
import { TestimonialTwo } from "@/components/testimonial/TestimonialTwo";
import { WhyWeAreTwo } from "@/components/why_we_are/WhyWeAreTwo";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function HomeTwo() {
  return (
    <Layout header={2} footer={2}>
      {/* banner */}
      <BannerTwo />

      {/* brand */}
      <BrandTwo />

      {/* about */}
      <AboutTwo />

      {/* animal shop */}
      <AnimalShopOne />

      {/* why we are */}
      <WhyWeAreTwo />

      {/* introducing */}
      <IntroducingOne />

      {/* counter */}
      <CounterTwo />

      {/* team */}
      <TeamTwo />

      {/* testimonial */}
      <TestimonialTwo />

      {/* blog */}
      <BlogTwo />
    </Layout>
  );
}
