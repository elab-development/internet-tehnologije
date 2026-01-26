import DeckBrowser from "../components/DeckBrowser";
import { mockSubjects } from "@/mock/data";

const getSubjects = async () => {
  const res = await fetch(process.env.API_URL + "/api/subjects", { cache: "no-cache" })
  if (!res.ok) return []

  return res.json()
}

export default async function Home() {
  const subjects = await getSubjects();
  return <DeckBrowser subjects={subjects} />;
}
