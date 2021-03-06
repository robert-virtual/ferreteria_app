import { Text, ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Buscador, ListaProductos } from "../components";
import axios from "axios";

export function Productos() {
  const [msg, setMsg] = useState("");
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);
  const [inicio, setInicio] = useState(0);
  const [cantidad, setCantidad] = useState(5);
  const [maxReached, setMaxReached] = useState(false);
  useEffect(() => {
    SolicitarProds();
  }, []);

  async function updateProds() {
    setCargando(true);
    const { data } = await axios.get("/productos");
    setProductos(data);
    setCargando(false);
  }
  async function SolicitarProds() {
    if (maxReached) {
      return;
    }
    try {
      setCargando(true);
      const { data } = await axios.get("/productos", {
        params: { inicio, cantidad },
      });
      if (!data.length) {
        setMaxReached(true);
        setCargando(false);
        return;
      }
      setProductos([...productos, ...data]);
      setInicio(inicio + cantidad);
      setMsg("");
    } catch (error) {
      console.log(error);
      setMsg(error.message);
    }
    setCargando(false);
  }

  async function onSubmitEditing() {
    setMsg(undefined);
    setCargando(true);
    try {
      const { data } = await axios.get(`/productos?nombre=${buscar}`);
      setProductos(data);
      setMsg("");
      if (!data.length) {
        setMsg(`No se encontraron productos referentes a "${buscar}"`);
      }
    } catch (error) {
      setMsg(error.message);
    }
    setCargando(false);
  }

  return (
    <View style={styles.container}>
      <Buscador
        placeholder={"Buscar..."}
        value={buscar}
        onSubmitEditing={onSubmitEditing}
        onChangeText={setBuscar}
      />
      {msg ? (
        <Text style={{ textAlign: "center" }}>{msg}</Text>
      ) : (
        <ListaProductos
          cargando={cargando}
          onRefresh={updateProds}
          onEndReached={SolicitarProds}
          prods={productos}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
