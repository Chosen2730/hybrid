import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const DateTimePick = ({ mode }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [disDate, setDisdate] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    // DateTimePickerAndroid.dismiss();
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: mode,
      is24Hour: false,
    });
  };

  useEffect(() => {
    if (mode === "date") {
      setDisdate(date.toLocaleDateString());
    } else {
      setDisdate(date.toLocaleTimeString());
    }
  }, [show, date]);

  return (
    <View>
      <TextInput
        className='bg-gray-100 p-3 rounded-md w-[100px]'
        onPressIn={showMode}
        placeholder='Select Date'
        value={disDate}
      />
    </View>
  );
};
