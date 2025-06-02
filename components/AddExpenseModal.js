import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import DatePicker from "./DatePicker";
const screenHeight = Dimensions.get("window").height;
import Ionicons from "react-native-vector-icons/Ionicons";
import { useExpenses } from "../store/ExpenseContext";
export default function AddExpenseModal({ visible, onClose, selectedExpense }) {
  const { addExpense, updateExpense } = useExpenses();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    if (selectedExpense) {
      setAmount(String(selectedExpense.amount)); // 💡 this is key
      setDescription(selectedExpense.description);
      setCategory(selectedExpense.category);
      setDate(new Date(selectedExpense.date));
    } else {
      // Clear form when adding new
      setAmount("");
      setDescription("");
      setCategory("");
      setDate(new Date());
    }
    setErrors({});
  }, [selectedExpense, visible]);

  const validate = () => {
    const newErrors = {};
    if (!amount || isNaN(amount)) {
      newErrors.amount = "Amount is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit() {
    const expenseData = {
      id: selectedExpense?.id || Date.now().toString(),
      amount: parseFloat(amount),
      description,
      category,
      date: date.toISOString().split("T")[0],
    };

    if (!validate()) {
      console.log("Invalid form");
      return; // ⛔️ Prevent closing modal
    }

    if (selectedExpense) {
      updateExpense(expenseData.id, expenseData);
    } else {
      addExpense(expenseData);
    }

    // ✅ Clear form and close only if valid
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date());

    onClose();
  }

  console.log(`MODAL EXPENSE : ${JSON.stringify(selectedExpense)}`);
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}></View>
      <View style={styles.modalContent}>
        <View>
          <Text style={styles.title}>
            {selectedExpense ? "Update Expense" : "Add New Expense"}
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={String(amount)}
            onChangeText={setAmount}
          />
          {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          {errors.category && (
            <Text style={styles.error}>{errors.category}</Text>
          )}

          <View style={styles.dateContainer}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#333"
              style={{ marginRight: 8 }}
            />
            <Text onPress={() => setShowPicker(true)} style={styles.dateText}>
              {date.toISOString().split("T")[0]}
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.btnAdd}>
              <Text style={{ fontSize: 18, color: "white" }}>
                {selectedExpense ? "Update" : "Add"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <View style={styles.btnClose}>
              <Text style={{ fontSize: 18, color: "white" }}>Close</Text>
            </View>
          </TouchableOpacity>

          {showPicker && (
            <DatePicker
              date={date}
              onSelected={(selectedDate) => {
                setDate(selectedDate);
                setShowPicker(false);
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent backdrop
    justifyContent: "flex-end", // stick modal to bottom
  },
  modalContent: {
    height: screenHeight * 0.5, // 50% of screen
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "space-around",
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  btnContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btnClose: {
    width: 100,
    height: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#545454",
    alignItems: "center",
  },
  btnAdd: {
    height: 40,
    width: 100,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#900C3F",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#545454",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#545454",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
  },
  dateText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});
