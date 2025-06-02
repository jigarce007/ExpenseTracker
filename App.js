import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ModalProvider } from "./store/ModalContext";
import { ExpenseProvider } from "./store/ExpenseContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  const TabNavigator = createBottomTabNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ExpenseProvider>
        <ModalProvider>
          <>
            <NavigationContainer>
              <TabNavigator.Navigator
                initialRouteName="All Expenses"
                screenOptions={({ route }) => ({
                  headerShown: true,
                  headerStyle: { backgroundColor: "#900C3F" },
                  headerTintColor: "white",
                  tabBarStyle: { backgroundColor: "#900C3F" },
                  tabBarActiveTintColor: "#fff",
                  tabBarInactiveTintColor: "#cecece",

                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Recent Expenses") {
                      iconName = focused ? "hourglass" : "hourglass-outline";
                      color = focused ? "#fff" : "#cecece";
                    } else if (route.name === "All Expenses")
                      iconName = focused ? "list" : "list-outline";
                    color = focused ? "#fff" : "#cecece";

                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
                  },
                })}
              >
                <TabNavigator.Screen
                  name="Recent Expenses"
                  component={RecentExpenses}
                />
                <TabNavigator.Screen
                  name="All Expenses"
                  component={AllExpenses}
                />
              </TabNavigator.Navigator>
            </NavigationContainer>
          </>
        </ModalProvider>
      </ExpenseProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
