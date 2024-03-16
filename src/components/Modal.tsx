import { View, Modal, StyleSheet } from "react-native";
function Page({
  children,
  modalVisible,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
}) {
  return (
    <Modal transparent={true} animationType="fade" style={styles.modal}>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    borderWidth: 1,
  },
});

export default Page;
