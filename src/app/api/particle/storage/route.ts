import { NextResponse, NextRequest } from "next/server";
import aws4 from "aws4";

const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!;
const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT!;

export async function GET(req: NextRequest) {

}