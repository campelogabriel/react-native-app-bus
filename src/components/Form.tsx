import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  View,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const dataExample = [
  "Gavea",
  "Ipanema",
  "Copacabana",
  "Leblon",
  "Barra da Tijuca",
  "Centro",
  "Estacio",
];

function Page({ setModalVisible }: any) {
  const [bairro, setBairro] = useState("Leblon");

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderColor: "#ccc",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#222" }}>
          Nova Localização
        </Text>
        <Pressable onPress={() => setModalVisible(false)}>
          <AntDesign
            style={styles.closeBtn}
            name="closesquare"
            size={32}
            color="#ff1100dd"
          />
        </Pressable>
      </View>
      <View style={{ gap: 12 }}>
        <Text>Bairro</Text>
        <Picker
          // mode="dropdown"

          style={{
            backgroundColor: "#f8fbff",
          }}
          onValueChange={(item) => setBairro(item)}
          selectedValue={bairro}
        >
          {dataExample.map((bairro, i) => (
            <Picker.Item
              style={
                Platform.OS == "ios" ? styles.inputIOS : styles.inputAndroid
              }
              key={i}
              label={bairro}
              value={bairro}
            />
          ))}
        </Picker>
        <Text>Endereço</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: "#ccc",
            padding: 9,
            backgroundColor: "#f8fbff",
          }}
          placeholderTextColor={"#757474"}
          placeholder="Rua"
        />
        <Text>Codigo Postal</Text>

        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: "#ccc",
            padding: 9,
            backgroundColor: "#f8fbff",
          }}
          placeholderTextColor={"#757474"}
          placeholder="CEP"
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.btnAtualizar}>
          <Text style={{ color: "#eee", fontSize: 14 }}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLocal}>
          <MaterialIcons name="gps-fixed" size={24} color="#026088dd" />
          <Text style={{ color: "#026088dd", fontSize: 14 }}>Local Atual</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    gap: 40,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  btnAtualizar: {
    padding: 8,
    borderRadius: 2,
    backgroundColor: "#026088dd",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  btnLocal: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: 8,
    borderRadius: 2,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  closeBtn: {
    alignSelf: "flex-end",
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
  },
});

export default Page;
