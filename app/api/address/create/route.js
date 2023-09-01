import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import prisma  from "@/app/libs/Prisma";

export const POST = async (req) => {
  const supabase = createServerComponentClient({ cookies });


  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const body = await req.json();
    if (!user) {
      return NextResponse.json("User is not defined", { status: 401 });
    }

    const res = await prisma.addresses.create({
      data: {
        user_id: user?.id,
        name: body.name,
        address: body.address,
        zipcode: body.zipcode,
        city: body.city,
        country: body.country,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(res);
  } catch (err) {
    await prisma.$disconnect();
    return NextResponse.json({message : err}, { status: 500 });
  }
};
