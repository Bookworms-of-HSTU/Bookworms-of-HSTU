import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'contact.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const messages = JSON.parse(fileContent);
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error reading messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
