import { useContext } from "react";
import { CartContext } from "../context";
import { Text, View } from "react-native";

export function CartTotal() {
  const { cart } = useContext(CartContext);
  if (!cart.length) {
    return <View />;
  }
  return (
    <Text style={{ marginEnd: 10 }}>
      Total: {cart.reduce((p, c) => p + Number(c.precio), 0)}
    </Text>
  );
}
