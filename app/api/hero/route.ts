import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagePath = 'C:\\Users\\JasonAs\\Music\\mm\\hero.png';
    const buffer = fs.readFileSync(imagePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('Error reading hero image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
