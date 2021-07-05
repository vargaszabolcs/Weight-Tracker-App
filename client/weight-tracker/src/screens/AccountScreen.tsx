import React, { useContext } from "react";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";


const AccountScreen: React.FC = ({ navigation }: any) => {
  const { signout } = useContext(AuthContext);

  return <>
    <Button
      title="Sign Out"
      onPress={() => {
        signout();
        navigation.navigate("Signin");
      }}
    />
  </>;
}

export default AccountScreen;