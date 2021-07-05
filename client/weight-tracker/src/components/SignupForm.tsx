import React from "react";
import { FC, useState } from "react";
import { Input, Button } from "react-native-elements";
import { StyleSheet } from "react-native";

export type Props = {
  onSignup: (email: string, password: string) => void
};

//TODO Verify email format and password matching

const SignupForm: FC<Props> = ({ onSignup }) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ rePassword, setRePassword ] = useState("");

  return (
    <>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        labelStyle={styles.entryFields}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        labelStyle={styles.entryFields}
      />
      <Input
        label="Repeat Password"
        value={rePassword}
        onChangeText={setRePassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        labelStyle={styles.entryFields}
      />
      <Button
        title="Sign Up"
        onPress={() => { onSignup(email, password) }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  entryFields: {
    marginTop: 15,
    fontSize: 20
  },
  signupText: {
    fontSize: 16,
    color: "blue"
  }
});

export default SignupForm;