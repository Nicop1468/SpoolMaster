import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assure-toi que ce chemin est correct selon ton projet

export async function GET() {
  try {
    const spools = await prisma.spool.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    return NextResponse.json(spools);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors du chargement" }, { status: 500 });
  }
}