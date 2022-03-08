import { StyleSheet } from "react-native";
import { useState, useContext, useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { api_url } from "../constantes";
import { AuthContext } from "../context";
import { Input } from "../components";

export function Login({ navigation }) {
  const { dispatch, isAuth } = useContext(AuthContext);
  useLayoutEffect(() => {
    if (isAuth) {
      navigation.navigate("Productos");
    }
  }, []);
  async function enviarDatos() {
    const { data } = await axios.post("/auth/login", {
      correo,
      clave,
    });
    if (data.error) {
      alert(data.error);
      return;
    }
    if (!data.accessToken || !data.refreshToken) {
      alert("Habido un error vuelva a intentar");
      return;
    }
    dispatch({
      type: "both",
      payload: { token: data.accessToken, rToken: data.refreshToken },
    });

    navigation.navigate("Cart");
  }
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  function irARecuperarClave() {
    navigation.navigate("RecuperarClave", correo);
  }
  function irARegistro() {
    navigation.navigate("Registro");
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/helmet.png")}
      ></Image>

      <Text style={styles.logoText}>Login Bienvenido</Text>

      <Input placeholder="Correo" value={correo} onChangeText={setCorreo} />

      <Input
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        password={true}
      />

      <TouchableOpacity onPress={irARecuperarClave}>
        <Text style={styles.txt}>¿Olvide mi contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={enviarDatos}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={irARegistro}>
        <Text style={styles.txtRgt}>
          ¿No tienes una cuenta? <Text style={styles.txt}>Registrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //justifyContent: 'center',
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    padding: 50,
    marginTop: 130,
  },
  logoText: {
    marginVertical: 15,
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  inputBox: {
    width: "80%",
    //textAlign:"center",
    //borderRadius: 15,
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 19,
    paddingVertical: 15,
    fontSize: 18,
    borderRadius: 5,
    color: "#1d1d1d",
    marginVertical: 10,
  },
  btn: {
    width: "80%",
    backgroundColor: "#00388b",
    marginVertical: 30,
    paddingVertical: 20,
    borderRadius: 5,
    textAlign: "center",
    textShadowColor: "#191970",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  txt: {
    color: "#0080FF",
    fontWeight: "500",
  },
  txtRgt: {
    marginTop: 60,
  },
});
