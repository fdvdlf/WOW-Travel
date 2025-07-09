import { AnimalDetailsRelated } from "@/components/animal/AnimalDetailsRelated";
import { AnimalDetailsTop } from "@/components/animal/AnimalDetailsTop";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function AnimalDetails() {
  return (
    <Layout breadcrumbTitle="Pet Details">
      <section className="animal__details-area">
        <div className="container">
          {/* top */}
          <AnimalDetailsTop />

          {/* slider */}
          <AnimalDetailsRelated />
        </div>
      </section>
    </Layout>
  );
}
