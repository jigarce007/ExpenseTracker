import { View, Text, StyleSheet, FlatList } from "react-native";
import AddExpenseButton from "../components/AddExpenseButton";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { EXPENSES } from "../dummydata/Expenses";
import ExpenseItem from "../components/ExpenseItem";

function AllExpenses({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddExpenseButton onPress={onPressAddExpense} />,
    });
  });
  function onPressAddExpense() {
    // console.log(`Add Expense Clicked in ALL EXPENSES`);
    // console.log(`ALL EXPENSES: \n ${JSON.stringify(EXPENSES)}`);
    const RecentExpenses = EXPENSES.filter((expense) => {
      const today = new Date();
      const expDate = new Date(expense.date);

      const diffTime = today - expDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      return diffDays >= 0 && diffDays <= 7;
    });

    console.log(`RECENT expenses : ${JSON.stringify(RecentExpenses)}`);
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={EXPENSES}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return <ExpenseItem expense={itemData.item} />;
        }}
      />
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
