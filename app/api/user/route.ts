import { NextResponse } from "next/server";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const mockUser: User = {
  id: "user-001",
  name: "John Developer",
  email: "john.developer@example.com",
  avatar: "https://loremflickr.com/150/150/person",
};

export async function GET(): Promise<NextResponse<{ user: User }>> {
  // Simulate fetch delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({ user: mockUser });
}