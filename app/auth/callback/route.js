import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from 'next/server';


export const GET = async (req) => {
   const reqUrl = new URL(req.url)
   const code = reqUrl.searchParams.get('code')


   if(code) {
      const supabase = createRouteHandlerClient({cookies})
      await supabase.auth.exchangeCodeForSession(code)

   }

   return NextResponse.redirect(reqUrl.origin)

}