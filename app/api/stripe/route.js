import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Stripe from 'stripe';

export const POST = async (req) => {
  const supabase = createServerComponentClient({ cookies });
  const body = await req.json();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json("User is not defined", { status: 401 });
    }

    const stripe = new Stripe(process.env.STRIPE_SK_KEY || '');
    const res  = await stripe.paymentIntents.create({
      amount : Number(body.amount),
      currency: 'usd',
      automatic_payment_methods : {enabled : true}
    })
    
    return NextResponse.json(res);
  } catch (err) {
  
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
