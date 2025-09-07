"use client";

import styles from "./page.module.scss";
import Link from "next/link";
import {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
} from "store/api/cartApi";
import { ProductCard } from "widgets";
import { Button, Loader } from "components";
import { useEffect, useState } from "react";
import { useAppSelector } from "shared/hook/hooks";

export default function Home() {
  const { items } = useAppSelector((state) => state.cart);
  const { error, isLoading } = useGetCartItemsQuery();
  const [deleteCartItem, { isLoading: deleteItemsLoading }] =
    useDeleteCartItemMutation();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const productsTotal = items
      ? items.reduce((sum, item) => sum + item.price, 0)
      : 0;
    setTotalPrice(productsTotal);
  }, [items]);

  const handleRemove = async (id: number) => {
    try {
      await deleteCartItem(id).unwrap();
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных</p>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__header}>
          <h1 className={styles.title}>Cart</h1>
        </div>
        <div className={styles.wrapper__content}>
          {deleteItemsLoading ? <Loader /> : null}
          <div className={styles.wrapper__contentList}>
            {items?.map((product) => (
              <ProductCard
                {...product}
                key={product.id}
                onClick={() => handleRemove(product.id)}
              />
            ))}
          </div>
          <div className={styles.wrapper__footer}>
            <div className={styles.total}>
              <p>
                Total: <span>${totalPrice.toFixed(2)}</span>
              </p>
            </div>
            <Link href="/checkout">
              <Button>Go to checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
