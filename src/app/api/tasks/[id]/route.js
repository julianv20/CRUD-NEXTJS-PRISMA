import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const task = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(task);
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const taskUpdated = await prisma.task.update({
      where: {
        id: Number(params.id),
      },
      data: data,
    });

    return NextResponse.json(taskUpdated);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}

export async function DELETE(request, { params }) {
  try {
    const taskRemove = await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(taskRemove);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
