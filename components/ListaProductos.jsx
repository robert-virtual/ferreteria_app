// @ts-check
import { FlatList } from "react-native";
import { uuid } from "../constantes";
import { Line } from "./Line";
import { Producto } from "./Producto";

/**
 * @typedef {import("./Producto").IProducto} Producto
 */
/**
 * @typedef {{enabled?:boolean,cart?:boolean,prods:Producto[],horizontal?:boolean,cargando:boolean,onRefresh:()=>Promise<void> }} Props
 */

/**
 *
 * @param {Props} props
 */
export function ListaProductos({
  cart = false,
  enabled = true,
  prods = [],
  horizontal = false,
  cargando = false,
  onRefresh,
}) {
  return (
    <FlatList
      refreshing={cargando}
      onRefresh={onRefresh}
      horizontal={horizontal}
      data={prods}
      keyExtractor={() => uuid()}
      ItemSeparatorComponent={!horizontal && Line}
      renderItem={({ item }) => (
        <Producto
          cart={cart}
          mini={horizontal}
          producto={item}
          enabled={enabled}
        />
      )}
    />
  );
}
