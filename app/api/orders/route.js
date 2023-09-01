import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import  prisma  from "@/app/libs/Prisma";

export const GET = async (req) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json("User is not defined", { status: 401 });
    }

    const orders = await prisma.orders.findMany({
      where: { user_id: user?.id },
      orderBy: { id: "desc" },
      include : {
         orderItem : {
            include : {
               product : true
            }
         }
      }
    });

    await prisma.$disconnect();
    return NextResponse.json(orders);
  } catch (err) {
    await prisma.$disconnect();
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
