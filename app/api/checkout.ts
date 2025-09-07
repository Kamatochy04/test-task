import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;

    // Здесь можно делать сохранение в БД
    console.log("Данные заказа:", data);

    return res.status(200).json({ message: "Заказ успешно сохранён" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Метод ${req.method} не поддерживается`);
}
