"use client";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <main className="bg-purple-400 h-full flex justify-center">
      <>
        <div>test</div>
        <button onClick={() => signIn("kakao")}>로그인</button>
      </>
    </main>
  );
}
