import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    // Envoi du mail avec ton nouveau domaine
    await resend.emails.send({
      from: "SpoolMaster <hello@inscription.lesimprimair.fr>",
      to: email,
      subject: "Bienvenue sur SpoolMaster",
      html: `<h1>Bienvenue ${name} !</h1><p>Ton compte a ete cree avec succes. Prêt a gerer tes bobines ?</p>`,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 });
  }
}