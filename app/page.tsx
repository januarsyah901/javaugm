import Hero from "@/components/home/Hero";
import VisiMisi from "@/components/home/VisiMisi";
import LatestPosts from "@/components/home/LatestPosts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />
      <VisiMisi />
      <LatestPosts />
    </div>
  );
}
