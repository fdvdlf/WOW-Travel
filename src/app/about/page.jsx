import { AboutFour } from "@/components/about/AboutFour";
import { CounterTwo } from "@/components/counter/CounterTwo";
import { TeamTwo } from "@/components/teams/TeamTwo";
import { WhyWeAreTwo } from "@/components/why_we_are/WhyWeAreTwo";
import { Layout } from "@/layouts/Layout";
import React from "react";

export default function About() {
  return (
    <Layout breadcrumbTitle="About Us" hideNewsLetter>
      {/* about */}
      <AboutFour />

      {/* why we are */}
      <WhyWeAreTwo />

      {/* counter */}
      <CounterTwo />

      {/* team */}
      <TeamTwo />
    </Layout>
  );
}
