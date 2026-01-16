
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  if (type === 'references') return NextResponse.json(await prisma.spoolReference.findMany());
  
  if (type === 'history') {
    return NextResponse.json(await prisma.consumption.findMany({ 
      where: { spool: { userId: session.user.id } },
      include: { spool: true }, 
      orderBy: { createdAt: 'desc' } 
    }));
  }

  return NextResponse.json(await prisma.spool.findMany({ 
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' } 
  }));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  try {
    const body = await request.json();
    
    // Creation de la bobine avec userId obligatoire
    const newSpool = await prisma.spool.create({
      data: {
        brand: body.brand,
        type: body.type,
        color: body.color,
        colorHex: body.colorHex,
        initialWeight: Number(body.initialWeight),
        currentWeight: Number(body.currentWeight),
        price: Number(body.price) || 0,
        link: body.link || null,
        nozzleTemp: Number(body.nozzleTemp) || 200,
        bedTemp: Number(body.bedTemp) || 60,
        userId: session.user.id // On attache a l'utilisateur actuel
      }
    });

    // Mise a jour du catalogue global (Optionnel)
    await prisma.spoolReference.upsert({
      where: { id: -1 }, // On utilise upsert pour creer si n'existe pas
      create: { 
        brand: body.brand, type: body.type, colorName: body.color, colorHex: body.colorHex,
        nozzleTemp: Number(body.nozzleTemp), bedTemp: Number(body.bedTemp)
      },
      update: {}
    }).catch(() => {}); // On ignore les erreurs d'upsert pour ne pas bloquer l'ajout

    return NextResponse.json(newSpool);
  } catch (e) { 
    console.error(e);
    return NextResponse.json({ error: "Erreur creation" }, { status: 500 }); 
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  try {
    const body = await request.json();
    
    // Verifier que la bobine appartient bien a l'utilisateur
    const existing = await prisma.spool.findUnique({ where: { id: body.id } });
    if (!existing || existing.userId !== session.user.id) {
        return NextResponse.json({ error: "Acces refuse" }, { status: 403 });
    }

    if (body.action === 'update_maintenance') {
      return NextResponse.json(await prisma.spool.update({
        where: { id: body.id },
        data: { storage: body.storage, lastDried: body.lastDried ? new Date(body.lastDried) : undefined }
      }));
    }

    if (body.action === 'update_details') {
        return NextResponse.json(await prisma.spool.update({
          where: { id: body.id },
          data: { rating: body.rating, note: body.note }
        }));
    }

    const newWeight = Math.max(0, existing.currentWeight - (body.amountUsed || 0));
    return NextResponse.json(await prisma.spool.update({ 
        where: { id: body.id }, 
        data: { currentWeight: newWeight } 
    }));
  } catch (e) { return NextResponse.json({ error: "Erreur" }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const existing = await prisma.spool.findUnique({ where: { id: body.id } });
  
  if (!existing || existing.userId !== session.user.id) return NextResponse.json({ error: "Interdit" }, { status: 403 });

  return NextResponse.json(await prisma.spool.delete({ where: { id: body.id } }));
}