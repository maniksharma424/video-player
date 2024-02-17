import { redirect } from "next/navigation";

const push = async () => {
  redirect("/watch");
};
export default async function Home() {
  await push();
  return <main></main>;
}
