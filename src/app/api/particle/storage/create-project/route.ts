import { NextResponse, NextRequest } from "next/server";


export default function POST(req: NextRequest) {
    return NextResponse.json({ message: "Hello, World!" });
}