import React, { FC, useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, ListItem } from "react-native-elements";
import AddWeightForm from "../components/AddWeightForm";
import { Context as DataContext } from "../context/DataContext";
import Moment from "moment";

const HomeScreen: FC = ({ navigation }: any) => {
  const { state, addWeight, fetchWeight } = useContext(DataContext);


  fetchWeight();
  // Date format: 2021-07-05T12:29:16.298+00:00


  return <>
    <AddWeightForm onAddWeight={addWeight} />
    <View style={{ flex: 1 }}>
      <Text h3 style={styles.recordsText}>Records</Text>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{item.weight} kg</ListItem.Title>
                <ListItem.Subtitle>{Moment(item.entryDate, "YYYY-MM-DDTHH:mm:ss").format("YYYY MMM DD - HH:mm")}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        }}
      />
    </View>
  </>;
}

const styles = StyleSheet.create({
  recordsText: {
    marginLeft: 15
  }
});

export default HomeScreen;