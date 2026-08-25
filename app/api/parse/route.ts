import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    const parsedText = await new Promise<string>((resolve, reject) => {
      const parser = new PDFParser(null, true);
      
      parser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
      parser.on("pdfParser_dataReady", () => {
        // decodeURIComponent converts %20 back into real spaces
        const rawText = parser.getRawTextContent();
        resolve(decodeURIComponent(rawText));
      });

      parser.parseBuffer(buffer);
    });

    return NextResponse.json({ text: parsedText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}