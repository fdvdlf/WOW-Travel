import { BannerAd } from "@/components/banner/BannerAd";
import { BannerFour } from "@/components/banner/BannerFour";
import { BlogFour } from "@/components/blogs/BlogFour";
import { BrandFour } from "@/components/brands/BrandFour";
import { CategoryOne } from "@/components/category/CategoryOne";
import { FeatureOne } from "@/components/features/FeatureOne";
import { FeatureTwo } from "@/components/features/FeatureTwo";
import { ProductHotSale } from "@/components/products/ProductHotSale";
import { ProductOne } from "@/components/products/ProductOne";
import { ProductTwo } from "@/components/products/ProductTwo";
import { TestimonialFour } from "@/components/testimonial/TestimonialFour";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function HomeFour() {
  return (
    <Layout header={4} footer={4}>
      {/* banner  */}
      <BannerFour />

      {/* features */}
      <FeatureOne />

      {/* divider */}
      <div className="divider-area">
        <div className="container">
          <div className="divider-wrap" />
        </div>
      </div>

      {/* product */}
      <ProductOne />

      {/* category */}
      <CategoryOne />

      {/* ad banner */}
      <BannerAd />

      {/* product */}
      <ProductHotSale />

      {/* features */}
      <FeatureTwo />

      {/* product */}
      <ProductTwo />

      {/* testimonial */}
      <TestimonialFour />

      {/* brand */}
      <BrandFour />

      {/* blog */}
      <BlogFour />
    </Layout>
  );
}
