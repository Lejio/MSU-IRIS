import { NextResponse, NextRequest } from "next/server";
import aws4 from "aws4";
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/r2'

const bucketName = 'msu-irrigation-research-lab'

export async function GET() {
    // Generate a unique key for the file
    const key = `uploads/test`;
  
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
  
    try {
      const signedUrl = await getSignedUrl(r2, command, { expiresIn: 60 }); // Expires in 1 hour
      console.log(`Generated signed URL: ${signedUrl}`);
      return NextResponse.json({ url: signedUrl, key });
    } catch (error) {
      console.error('Error generating signed URL:', error);
      return NextResponse.error();
    }
  }