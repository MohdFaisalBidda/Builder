import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();
  console.log(session, "session from home");
  return (
  <div>hello</div>
  );
}
