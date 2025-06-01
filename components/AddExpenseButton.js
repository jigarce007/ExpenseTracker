import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const AddExpenseButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.iconstyle} onPress={onPress}>
      <View style={styles.iconstyle}>
        <Ionicons name="add" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export default AddExpenseButton;

const styles = StyleSheet.create({
  iconstyle: {
    marginEnd: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
