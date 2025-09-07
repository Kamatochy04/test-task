import { NextResponse } from "next/server";
import { items } from "../items";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = parseInt(params.id, 10);

  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  items.splice(itemIndex, 1);
  console.log(items);
  return NextResponse.json(id);
}
