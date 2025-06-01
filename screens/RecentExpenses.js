import { View, Text, StyleSheet, FlatList } from "react-native";
import AddExpenseButton from "../components/AddExpenseButton";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { EXPENSES } from "../dummydata/Expenses";
import ExpenseItem from "../components/ExpenseItem";

function RecentExpenses() {
  const navigation = useNavigation();
  const RecentExpenses = EXPENSES.filter((expense) => {
    const today = new Date();
    const date7daysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return expense.date >= date7daysAgo.toISOString().slice(0, 10);
  });

  const TotalRecent = RecentExpenses.map((e) => e.amount).reduce(
    (a, b) => a + b,
    0
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddExpenseButton onPress={onPressAddExpense} />,
    });
  });

  const onPressAddExpense = () => {
    console.log(`RECENTS : \n ${JSON.stringify(RecentExpenses)}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.recentTitleContainer}>
        <Text style={styles.recentText}>Last 7 Days Expenses</Text>
        <Text
          style={[styles.recentText, { fontWeight: "bold" }, { fontSize: 18 }]}
        >
          {TotalRecent}
        </Text>
      </View>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={RecentExpenses}
        renderItem={(itemData) => <ExpenseItem expense={itemData.item} />}
      />
    </View>
  );
}
export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recentTitleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#2e4053",
    borderRadius: 10,
  },
  recentText: {
    fontSize: 14,
    fontWeight: "thin",
    fontStyle: "normal",
    color: "white",
  },
});
