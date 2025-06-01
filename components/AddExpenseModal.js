import { Modal,View,Text,Button} from "react-native";

export default function AddExpenseModal({visible, onClose, onAddExpense}) {
    return (
        <Modal visible={visible} animationType="slide">
            <View>
                <Text>Add Expense</Text>
                <Button title="Close" onPress={onClose} />
                <Button title="Add Expense" onPress={onAddExpense} />
            </View>
        </Modal>
    )
}