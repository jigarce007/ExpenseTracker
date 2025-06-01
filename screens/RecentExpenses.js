import { View, Text, StyleSheet, FlatList } from "react-native";
import AddExpenseButton from "../components/AddExpenseButton";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ExpenseItem from "../components/ExpenseItem";
import { useExpenses } from "../store/ExpenseContext";
import { useModal } from "../store/ModalContext";
import AddExpenseModal from "../components/AddExpenseModal";
function RecentExpenses() {
  const { expenses } = useExpenses();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const { isModalVisible, openModal, closeModal } = useModal();
  const navigation = useNavigation();
  const RecentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return new Date(expense.date) >= date7daysAgo;
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

  function handleEditExpense(expense) {
    setSelectedExpense(expense); // Set the selected one
    openModal();
  }
  function handleCloseModal() {
    closeModal();
    setTimeout(() => {
      setSelectedExpense(null);
    }, 300); // adjust if animation is longer/slower
  }

  function onPressAddExpense() {
    setSelectedExpense(null); // 👈 make sure to do this!
    openModal();
  }

  function handleAddExpense() {
    console.log(`Expenses will be Added soon!`);
    isModalVisible ? closeModal() : openModal();
  }
  return (
    <View style={styles.container}>
      <View style={styles.recentTitleContainer}>
        <Text style={styles.recentText}>Last 7 Days Expenses</Text>
        <Text
          style={[styles.recentText, { fontWeight: "bold" }, { fontSize: 18 }]}
        >
          RM {TotalRecent}
        </Text>
      </View>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={RecentExpenses}
        renderItem={(itemData) => (
          <ExpenseItem expense={itemData.item} onSelected={handleEditExpense} />
        )}
      />
      <AddExpenseModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddExpense={handleAddExpense}
        selectedExpense={selectedExpense}
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
    margin: 10,
    paddingHorizontal: 20,
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
