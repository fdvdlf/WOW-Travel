import { ProductAll } from "@/components/products/ProductAll";
import { ProductPagination } from "@/components/products/ProductPagination";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function Product() {
  return (
    <Layout breadcrumbTitle="All Products">
      <section className="product__area-four">
        <div className="container">
          {/* list */}
          <ProductAll />

          {/* pagination */}
          <ProductPagination />
        </div>
      </section>
    </Layout>
  );
}
