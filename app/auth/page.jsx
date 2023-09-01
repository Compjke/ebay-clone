"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Image from "next/image";
import Link from "next/link";

const AuthPage = () => {
  const redirectUrl = `${window.location.origin}/auth/callback`;
  const supabase = createClientComponentClient();
  return (
    <>
      <div id="AuthPage" className="w-full min-h-screen bg-white">
        <div className="w-full flex items-center justify-center p-5 border-b-gray-500 ">
          <Link href={"/"} className="min-w-[150px]">
            <Image
              src={"/images/logo.svg"}
              width={170}
              height={170}
              alt="logo"
              className="w-[170px]"
            />
          </Link>
        </div>

        <div className="w-full flex items-center justify-center p-5 border-b-gray-400">
          Login / Register
        </div>

        <div className="max-w-[400px] mx-auto px-2">
          <Auth
            onlyThirdPartyProviders
            redirectTo={redirectUrl}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            supabaseClient={supabase}
          />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
