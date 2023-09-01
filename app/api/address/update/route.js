import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import prisma  from "@/app/libs/Prisma";

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

    const res = await prisma.addresses.update({
      where: {
        id: Number(body.addressId),
      },
      data: {
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
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
