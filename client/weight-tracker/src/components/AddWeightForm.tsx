import React, { FC, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { WeightEntryData } from "../context/DataContext";

type Props = {
  onAddWeight: (weightEntry: WeightEntryData) => void
};


const AddWeightForm: FC<Props> = ({ onAddWeight }) => {
  const [ weight, setWeight ] = useState(undefined);

  return <View style={styles.container}>
    <Text h2>Weight</Text>
    <Input
      value={weight}
      onChangeText={setWeight}
      keyboardType="numeric"
      inputContainerStyle={styles.input}
    />
    <Button title="Add Weight" onPress={() => {
      const intWeight = parseInt(weight);
      onAddWeight({ weight: intWeight });
      setWeight(undefined);
    }} />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  weightText: {
  },
  input: {
    marginHorizontal: 50
  }
});

export default AddWeightForm;