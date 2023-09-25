import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const DateTimePickIOS = ({ mode, date, setDate }) => {
  const [show, setShow] = useState(false);
  const [disDate, setDisdate] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  useEffect(() => {
    if (mode === "date") {
      setDisdate(date?.toLocaleDateString());
    } else {
      setDisdate(date?.toLocaleTimeString());
    }
  }, [show, date]);

  return (
    <View>
      {!show && (
        <TextInput
          className='bg-gray-100 p-3 rounded-md w-[100px]'
          onPressIn={() => setShow(true)}
          placeholder='Select Date'
          value={disDate}
        />
      )}

      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          style={{ width: 130 }}
        />
      )}
    </View>
  );
};
