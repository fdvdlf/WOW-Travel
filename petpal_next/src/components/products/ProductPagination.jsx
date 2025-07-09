import React from "react";
import Link from "next/link";

const paginationPrev = "/icon/pagination_icon01.svg";
const paginationNext = "/icon/pagination_icon02.svg";

export const ProductPagination = () => {
  return (
    <nav className="pagination__wrap mt-50">
      <ul className="list-wrap">
        <li className="link-arrow">
          <Link href="#">
            <img src={paginationPrev} alt="Previous" className="injectable" />
          </Link>
        </li>
        <li className="active">
          <Link href="#">1</Link>
        </li>
        <li>
          <Link href="/courses">2</Link>
        </li>
        <li>
          <Link href="/courses">3</Link>
        </li>
        <li>
          <Link href="/courses">4</Link>
        </li>
        <li className="link-arrow">
          <Link href="#">
            <img src={paginationNext} alt="Next" className="injectable" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
