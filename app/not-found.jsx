import { Layout } from "@/layouts/Layout";
import Link from "next/link";

const errorImg = "/images/error_img.png";
const rightArrow = "/icon/right_arrow.svg";

export default function NotFoundPage() {
  return (
    <Layout breadcrumbTitle="Error Page" breadcrumbSubtitle={"404"}>
      <section className="error__area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="error__img">
                <img src={errorImg} alt="404 Error" />
              </div>
              <div className="error__content">
                <h2 className="title">OOPS! Nothing Was Found</h2>
                <p>
                  Oops! it could be you or us, there is no page here. It might
                  have been <br /> moved or deleted.Back To Home
                </p>
                <Link href="/" className="btn">
                  Back To Home Page{" "}
                  <img
                    src={rightArrow}
                    alt="Right Arrow"
                    className="injectable"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
