import { AnimalList } from "@/components/animal/AnimalList";
import { AnimalSidebar } from "@/components/animal/AnimalSidebar";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function Animal() {
  return (
    <Layout breadcrumbTitle="All Pets">
      <section className="animal__area-three">
        <div className="container">
          <div className="row">
            {/* list */}
            <AnimalList />

            {/* sidebar */}
            <AnimalSidebar />
          </div>
        </div>
      </section>
    </Layout>
  );
}
