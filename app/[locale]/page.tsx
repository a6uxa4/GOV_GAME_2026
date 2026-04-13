import { HomePage } from "@/screens/home";
import { DisciplinePage } from "@/screens/discipline";
import { NewsPage } from "@/screens/news";
import { AboutPage } from "@/screens/about";
import { BroadcastsPage } from "@/screens/broadcasts";
import { FormatPage } from "@/screens/format";
import { SponsorsPage } from "@/screens/sponsors";
import { HashScrollHandler } from "@/utils/hooks/useHashScrollHandler";
import { SchedulePage } from "@/screens/schedule";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <HashScrollHandler />
      <HomePage />
      <DisciplinePage />
      <NewsPage />
      <AboutPage />
      <BroadcastsPage />
      <FormatPage />
      <SchedulePage />
      <SponsorsPage />
    </main>
  );
}
