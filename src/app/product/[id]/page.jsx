import { ProductDetailsReview } from "@/components/products/ProductDetailsReview";
import { ProductDetailsTop } from "@/components/products/ProductDetailsTop";
import { ProductRelated } from "@/components/products/ProductRelated";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function ProductDetails() {
  return (
    <Layout
      breadcrumbTitle="Products Details"
      breadcrumbSubtitle={"All Products"}
    >
      <section className="product__details-area">
        <div className="container">
          {/* top */}
          <ProductDetailsTop />

          {/* review */}
          <ProductDetailsReview />

          {/* related products */}
          <ProductRelated />
        </div>
      </section>
    </Layout>
  );
}
