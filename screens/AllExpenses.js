import { View, Text, StyleSheet, FlatList } from "react-native";
import AddExpenseButton from "../components/AddExpenseButton";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";

import ExpenseItem from "../components/ExpenseItem";
import { useModal } from "../store/ModalContext";
import AddExpenseModal from "../components/AddExpenseModal";
import { useExpenses } from "../store/ExpenseContext";
function AllExpenses({ navigation }) {
  const { expenses } = useExpenses();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const { isModalVisible, openModal, closeModal } = useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddExpenseButton onPress={onPressAddExpense} />,
    });
  });

  function handleEditExpense(expense) {
    setSelectedExpense(expense); // Set the selected one
    openModal();
  }

  function onPressAddExpense() {
    setSelectedExpense(null); // 👈 make sure to do this!
    openModal();
  }

  function handleCloseModal() {
    closeModal();
    setTimeout(() => {
      setSelectedExpense(null);
    }, 300);
  }

  function handleAddExpense() {
    console.log(`Expenses will be Added soon!`);
    isModalVisible ? closeModal() : openModal();
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <ExpenseItem
              expense={itemData.item}
              onSelected={handleEditExpense}
            />
          );
        }}
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

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
