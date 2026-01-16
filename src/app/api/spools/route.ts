import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const spools = await prisma.spool.findMany();
    return NextResponse.json(spools || []);
  } catch (e) {
    console.error(e);
    return NextResponse.json([], { status: 200 }); // On renvoie un tableau vide meme en cas d'erreur
  }
}