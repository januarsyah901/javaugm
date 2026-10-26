import Hero from "@/components/home/Hero";
import VisiMisi from "@/components/home/VisiMisi";
import LatestPosts from "@/components/home/LatestPosts";

export const revalidate = 60; // Revalidate every 60 seconds

export default function Home() {
  return (
    <div className="flex flex-col gap-20 sm:gap-24 pb-24 bg-[#f4f4f5]">
      <Hero />
      <VisiMisi />
      <LatestPosts />
    </div>
  );
}
