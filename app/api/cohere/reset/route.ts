import { NextResponse } from "next/server";
import { reset } from "@/lib/cohere-rag/pipeline";

export async function POST() {
  reset();
  return NextResponse.json({ message: "Document cleared." });
}
