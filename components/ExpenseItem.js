import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const ExpenseItem = ({ expense, onSelected, onDelete }) => {
  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={() => onDelete(expense.id)}>
        <View style={styles.deleteBox}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  };

  function onPressHandler() {
    console.log(`Expense : ${expense.description} - $`);
    onSelected(expense);
  }

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable onPress={onPressHandler}>
        {({ pressed }) => (
          <View style={[styles.container, pressed && styles.itemPressed]}>
            <View style={styles.descriptionContainer}>
              <Text
                style={styles.itemText}
                maxLength={10}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {expense.description}
              </Text>
              <Text style={styles.datetext}>{expense.date}</Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amount}>RM {expense.amount}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </Swipeable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 6,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    justifyContent: "space-between",
  },

  itemPressed: {
    backgroundColor: "#c0c0c0",
  },
  descriptionContainer: {
    padding: 10,
    flexDirection: "column",
    padding: 10,
  },
  amountContainer: {
    width: "25%",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    elevation: 3,
    backgroundColor: "#2e4053",
    justifyContent: "center",
    alignItems: "center",
  },

  amount: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  datetext: {
    fontSize: 12,
    fontWeight: "normal",
    marginStart: 5,
  },
  deleteBox: {
    backgroundColor: "#d11a2a",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
});
