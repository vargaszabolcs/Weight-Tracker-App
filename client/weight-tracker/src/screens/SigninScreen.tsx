import React, { FC } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SigninForm from "../components/SigninForm";
import { Context as AuthContext } from "../context/AuthContext";

type Props = {
  navigation: any
};

const SigninScreen: FC<Props> = ({ navigation }) => {
  const { tryLocalSignin, state: { token, errorMessage }, signin, clearError } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
    if (token) navigation.navigate("HomeFlow");
  }, [ token ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", clearError);

    return unsubscribe;
  }, [ navigation ]);

  return <SafeAreaView style={styles.screen}>
    <SigninForm onSignup={() => navigation.navigate("Signup")} onLogin={signin} errorMessage={errorMessage} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 15
  }
});

export default SigninScreen;