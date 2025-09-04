import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'timetable.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading timetable data:', error);
    return NextResponse.json({ error: 'Failed to load timetable data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const updatedData = await request.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));
    return NextResponse.json({ message: 'Timetable updated successfully' });
  } catch (error) {
    console.error('Error updating timetable data:', error);
    return NextResponse.json({ error: 'Failed to update timetable data' }, { status: 500 });
  }
}