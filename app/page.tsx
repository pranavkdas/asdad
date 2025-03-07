import YouTubeBackground from './youtubeBackground';
import Navbar from "./navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <YouTubeBackground videoId="B9Lrg8SrZ5A" />
      </div>
    </>
  );
}
