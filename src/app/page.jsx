import { AboutOne, AboutTwo } from "@/components/about/AboutTwo";
import { BannerOne, BannerTwo } from "@/components/banner/BannerTwo";
import { BlogOne } from "@/components/blogs/BlogOne";
import { BrandOne } from "@/components/brands/brandTwo";
import { CounterOne } from "@/components/counter/CounterOne";
import { InstagramOne } from "@/components/insta/InstagramOne";
import { MarqueeOne } from "@/components/marquee/MarqueeOne";
import { RegistrationOne } from "@/components/registration/RegistrationOne";
import { ServiceOne } from "@/components/service/ServiceOne";
import { TeamOne } from "@/components/teams/TeamOne";
import { TestimonialOne } from "@/components/testimonial/TestimonialOne";
import { WhyWeAreOne } from "@/components/why_we_are/WhyWeAreOne";
import { Layout } from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout header={3} footer={1}>
      {/* banner two */}
      <BannerTwo />

      {/* about two */}
      <AboutTwo />

      {/* marquee one */}
      <MarqueeOne />

      {/* service one */}
      <ServiceOne />

      {/* why we are */}
      <WhyWeAreOne />

      {/* counter */}
      <CounterOne />

      {/* brand */}
      <BrandOne />

      {/* team */}
      <TeamOne />

      {/* testimonial */}
      <TestimonialOne />

      {/* registration */}
      <RegistrationOne />

      {/* blog */}
      <BlogOne />

      {/* insta */}
      <InstagramOne />
    </Layout>
  );
}
