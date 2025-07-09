"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const HeaderNav = () => {
  const pathname = usePathname();

  const isActiveMenu = (paths) => {
    return paths.some((path) => pathname === path);
  };

  return (
    <ul className="navigation">
      <li
        className={`menu-item-has-children ${
          isActiveMenu(["/", "/home2", "/home3", "/home4"]) ? "active" : ""
        }`}
      >
        <a href="#">Home</a>
        <ul className="sub-menu">
          <li className={pathname === "/" ? "active" : ""}>
            <Link href="/">Pet Care & Veterinary</Link>
          </li>
          <li className={pathname === "/home2" ? "active" : ""}>
            <Link href="/home2">Pet Breed</Link>
          </li>
          <li className={pathname === "/home3" ? "active" : ""}>
            <Link href="/home3">Pet Adopt</Link>
          </li>
          <li className={pathname === "/home4" ? "active" : ""}>
            <Link href="/home4">pet Woocommerce</Link>
          </li>
        </ul>
      </li>
      <li className={pathname === "/about" ? "active" : ""}>
        <Link href="/about">About</Link>
      </li>
      <li
        className={`menu-item-has-children ${
          isActiveMenu(["/product", "/product/p-123"]) ? "active" : ""
        }`}
      >
        <a href="#">Shop</a>
        <ul className="sub-menu">
          <li className={pathname === "/product" ? "active" : ""}>
            <Link href="/product">Our Shop</Link>
          </li>
          <li className={pathname === "/product/p-123" ? "active" : ""}>
            <Link href="/product/p-123">Shop Details</Link>
          </li>
        </ul>
      </li>
      <li
        className={`menu-item-has-children ${
          isActiveMenu([
            "/animal",
            "/animal/a-123",
            "/gallery",
            "/faq",
            "/pricing",
            "/reservation",
            "/team",
            "/team/t-123",
            "/blog",
            "/blog/b-123",
            "/error",
          ])
            ? "active"
            : ""
        }`}
      >
        <a href="#">Pages</a>
        <ul className="sub-menu">
          <li className={pathname === "/animal" ? "active" : ""}>
            <Link href="/animal">All Pets</Link>
          </li>
          <li className={pathname === "/animal/a-123" ? "active" : ""}>
            <Link href="/animal/a-123">Pet Details</Link>
          </li>
          <li className={pathname === "/gallery" ? "active" : ""}>
            <Link href="/gallery">Gallery</Link>
          </li>
          <li className={pathname === "/faq" ? "active" : ""}>
            <Link href="/faq">Faq Page</Link>
          </li>
          <li className={pathname === "/pricing" ? "active" : ""}>
            <Link href="/pricing">Pricing Page</Link>
          </li>
          <li className={pathname === "/reservation" ? "active" : ""}>
            <Link href="/reservation">Reservation Page</Link>
          </li>
          <li className={pathname === "/team" ? "active" : ""}>
            <Link href="/team">Our Team</Link>
          </li>
          <li className={pathname === "/team/t-123" ? "active" : ""}>
            <Link href="/team/t-123">Team Details</Link>
          </li>
          <li className={pathname === "/blog" ? "active" : ""}>
            <Link href="/blog">Our Blog</Link>
          </li>
          <li className={pathname === "/blog/b-123" ? "active" : ""}>
            <Link href="/blog/b-123">Blog Details</Link>
          </li>
          <li className={pathname === "/error" ? "active" : ""}>
            <Link href="/error">404 Error Page</Link>
          </li>
        </ul>
      </li>
      <li className={pathname === "/contact" ? "active" : ""}>
        <Link href="/contact">contacts</Link>
      </li>
    </ul>
  );
};
