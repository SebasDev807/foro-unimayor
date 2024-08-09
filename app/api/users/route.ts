import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";

export async function GET() {
  const users = await client.user.findMany();
  console.log(users);

  return NextResponse.json(users);
}
