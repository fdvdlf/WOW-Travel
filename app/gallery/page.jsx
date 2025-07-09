"use client";

import { Layout } from "@/layouts/Layout";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const popupIcon = "/icon/popup_icon.svg";
const gallery1 = "/gallery/gallery_img01.jpg";
const gallery2 = "/gallery/gallery_img02.jpg";
const gallery3 = "/gallery/gallery_img03.jpg";
const gallery4 = "/gallery/gallery_img04.jpg";
const gallery5 = "/gallery/gallery_img05.jpg";
const gallery6 = "/gallery/gallery_img06.jpg";
const gallery7 = "/gallery/gallery_img07.jpg";
const gallery8 = "/gallery/gallery_img08.jpg";
const gallery9 = "/gallery/gallery_img09.jpg";

const galleryImages = [
  { id: 0, src: gallery1 },
  { id: 1, src: gallery2 },
  { id: 2, src: gallery3 },
  { id: 3, src: gallery4 },
  { id: 4, src: gallery5 },
  { id: 5, src: gallery6 },
  { id: 6, src: gallery7 },
  { id: 7, src: gallery8 },
  { id: 8, src: gallery9 },
];

export default function Gallery() {
  const [id, setId] = useState(null);
  const slides = galleryImages.map((imagePath) => ({ src: imagePath.src }));

  return (
    <Layout breadcrumbTitle="Our Gallery" breadcrumbSubtitle={"Gallery"}>
      <div className="gallery__area">
        <div className="container">
          <div className="row">
            {galleryImages.map((imagePath, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="gallery__item">
                  <div className="gallery__img">
                    <img
                      src={imagePath.src}
                      alt={`gallery image ${index + 1}`}
                    />
                  </div>
                  <a
                    href={"#"}
                    className="popup-image"
                    onClick={(e) => {
                      e.preventDefault();
                      setId(imagePath.id);
                    }}
                  >
                    <img src={popupIcon} alt="icc" className="injectable" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        slides={slides}
        open={id !== null}
        index={id}
        close={() => setId(null)}
        styles={{ container: { background: "rgba(0,0,0,0.75)" } }}
        controller={{ closeOnBackdropClick: true }}
      />
    </Layout>
  );
}
