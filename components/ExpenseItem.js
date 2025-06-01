import { Text, View, StyleSheet } from "react-native";
const ExpenseItem = ({ expense }) => {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.itemText}>{expense.description}</Text>
        <Text style={styles.datetext}>{expense.date}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>RM {expense.amount}</Text>
      </View>
    </View>
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
});
