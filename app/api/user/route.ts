import { NextResponse } from "next/server";

export async function GET() {
  console.log("dsdfsd");
  return NextResponse.json({
    firstName: "Andrey",
    lastName: "Valiuk",
    email: "test@test.ru",
  });
}
