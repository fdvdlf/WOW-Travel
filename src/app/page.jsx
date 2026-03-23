import { AboutOne } from "@/components/about/AboutOne";
import { BannerOne } from "@/components/banner/BannerOne";
import { BlogOne } from "@/components/blogs/BlogOne";
import { BrandOne } from "@/components/brands/BrandOne";
import { CounterOne } from "@/components/counter/CounterOne";
import { InstagramOne } from "@/components/insta/InstagramOne";
import { LanguageCloud } from "@/components/language/LanguageCloud";
import { MarqueeOne } from "@/components/marquee/MarqueeOne";
import { RegistrationOne } from "@/components/registration/RegistrationOne";
import { ServiceOne } from "@/components/service/ServiceOne";
import { TeamOne } from "@/components/teams/TeamOne";
import { TestimonialOne } from "@/components/testimonial/TestimonialOne";
import { WhyWeAreOne } from "@/components/why_we_are/WhyWeAreOne";
import { Layout } from "@/layouts/Layout";

const showBlogSection = false;
const showInstagramSection = false;

export default function Home() {
  return (
    <Layout header={3} footer={1}>
      {/* banner one */}
      <BannerOne />

      {/* about one */}
      <AboutOne />

      {/* marquee one */}
      <MarqueeOne />

      {/* language cloud */}
      <LanguageCloud />

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
      {showBlogSection ? <BlogOne /> : null}

      {/* insta */}
      {showInstagramSection ? <InstagramOne /> : null}
    </Layout>
  );
}
