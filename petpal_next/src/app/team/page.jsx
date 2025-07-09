import { BrandFive } from "@/components/brands/BrandFive";
import { TeamList } from "@/components/teams/TeamList";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function Team() {
  return (
    <Layout breadcrumbTitle="Team Members" breadcrumbSubtitle={"Team"}>
      {/* list */}
      <TeamList />

      {/* brands */}
      <BrandFive />
    </Layout>
  );
}
