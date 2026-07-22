import { NextResponse } from "next/server";
import { z } from "zod";
import { submissionSchema } from "@/lib/submissionSchema";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { notifyTelegram } from "@/lib/telegram";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_error", issues: z.treeifyError(parsed.error) },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: bots fill hidden fields. Pretend success without writing anything.
  if (data.website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  try {
    const supabase = getSupabaseAdminClient();

    const { error } = await supabase.from("submissions").insert({
      name: data.name,
      company: data.company || null,
      phone: data.phone,
      email: data.email,
      category: data.category || null,
      problem_description: data.problemDescription,
      proposed_solution: data.proposedSolution || null,
      language: data.language,
    });

    if (error) {
      console.error("Failed to insert submission:", error.message);
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }

    await notifyTelegram(data);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Submission route failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
