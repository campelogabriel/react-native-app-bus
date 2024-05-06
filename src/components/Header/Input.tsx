import { TextInput } from "react-native";

function Input({
  line,
  setLine,
  setIsFocus,
  handleSubmitBusLine,
  isFocus,
  refInput,
  isNight,
}) {
  return (
    <TextInput
      ref={refInput}
      onFocus={() => setIsFocus(true)}
      autoCapitalize={"characters"}
      placeholder="Digite a linha..."
      placeholderTextColor={isNight ? "#aaa" : "#444"}
      returnKeyType="done"
      clearTextOnFocus={true}
      maxLength={13}
      value={line}
      onEndEditing={() => {
        setIsFocus(false);
      }}
      onChangeText={(text) => {
        setLine(text);
      }}
      style={{
        color: isNight ? "#fff" : "#0e997d",
        textDecorationLine: "none",
        backgroundColor: isNight ? "#11111144" : "#fff",
        textAlign: "center",
      }}
      onSubmitEditing={() => {
        setIsFocus(false);
        handleSubmitBusLine();
      }}
    />
  );
}

export default Input;
