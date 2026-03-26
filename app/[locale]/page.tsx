import { HomePage } from "@/screens/home";
import { DisciplinePage } from "@/screens/discipline";
import { NewsPage } from "@/screens/news";
import { AboutPage } from "@/screens/about";
import { BroadcastsPage } from "@/screens/broadcasts";
import { FormatPage } from "@/screens/format";
import { SponsorsPage } from "@/screens/sponsors";
import { HashScrollHandler } from "@/components/HashScrollHandler";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <HashScrollHandler />
      <HomePage />
      <DisciplinePage />
      <NewsPage />
      <AboutPage />
      <BroadcastsPage />
      <FormatPage />
      <SponsorsPage />
    </main>
  );
}
