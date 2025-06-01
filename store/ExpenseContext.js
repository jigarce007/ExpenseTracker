import { createContext, useContext, useEffect, useState } from "react";
import { EXPENSES } from "../dummydata/Expenses";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "expenses";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([...EXPENSES]);
  // Load data from AsyncStorage once on app start
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (error) {
        console.log("ERROR FETCHING EXPENSES", error);
      }
    };
    fetchExpenses();
  }, []);

  //helper to persist data to AsyncStorage
  const saveToStorage = async (updatedExpenses) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      console.log("ERROR SAVING EXPENSES", error);
    }
  };

  function addExpense(expense) {
    setExpenses((prev) => {
      const updated = [...prev, expense];
      saveToStorage(updated);
      return updated;
    });
  }

  function deleteExpense(expenseId) {
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== expenseId);
      saveToStorage(updated);
      return updated;
    });
  }

  function updateExpense(expenseId, updatedExpense) {
    setExpenses((prev) => {
      const updated = prev.map((e) =>
        e.id === expenseId ? updatedExpense : e
      );
      saveToStorage(updated);
      return updated;
    });
  }

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
export const useExpenses = () => useContext(ExpenseContext);
