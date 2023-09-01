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

    const newOrder = await prisma.orders.create({
      data: {
        user_id: user?.id,
        stripe_id: body.stripe_id,
        name: body.name,
        address: body.address,
        zipcode: body.zipcode,
        city: body.city,
        country: body.country,
        total: Number(body.total),
      },
    });

    body.products.forEach(async (prod) => {
      await prisma.orderItem.create({
        data: {
          order_id: newOrder.id,
          product_id: Number(prod.id),
        },
      });
    });

    await prisma.$disconnect();
    return NextResponse.json("Oreder was created", { status: 201 });
  } catch (err) {
    await prisma.$disconnect();
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
