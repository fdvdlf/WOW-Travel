import Home from "@/app/page";
import { notFound } from "next/navigation";

export default function CatchAllPage({ params }) {
  if (params?.slug?.length) {
    notFound();
  }

  return <Home />;
}
