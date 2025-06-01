import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function DatePicker({ onSelected, date }) {
  const handleChange = (event, selectedDate) => {
    if (selectedDate) {
      onSelected(selectedDate); // just pass full date object
    }
  };
  return (
    <DateTimePicker
      mode="date"
      onChange={handleChange}
      display="default"
      value={date}
    />
  );
}

export default DatePicker;
