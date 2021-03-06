import {
  Alert,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../context";
import { ListaProductos } from "../components";
import axios from "axios";

export function Cart({ navigation }) {
  const { cart, setCart } = useContext(CartContext);

  function borratTodo() {
    setCart([]);
  }
  async function enviarCompra() {
    try {
      const { data } = await axios.post("/ventas", {
        productos: cart.map((p) => ({
          productoFk: p.id,
          cantidad: p.cantidad,
        })),
      });
      console.log(data);
      // limpiar el carrito
      if (data.venta) {
        Alert.alert("Ferreteria Movil", "Venta realizado con exito");
        setCart([]);
        navigation.navigate("Historial");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (!cart.length) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center" }}>Carrito vacio</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Button title="Borrar Todo" onPress={borratTodo} color={"#ff5e5e"} />

      <ListaProductos cart prods={cart} />
      <TouchableOpacity
        onPress={enviarCompra}
        style={{ backgroundColor: "#3b82f6", padding: 15 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Terminar Compra
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
