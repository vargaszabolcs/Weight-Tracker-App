import React from "react";
import { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { StyleSheet } from "react-native";

type Props = {
  onLogin: (email: string, password: string) => void,
  onSignup: () => void,
  errorMessage: string
};

const SigninForm: FC<Props> = ({ onLogin, onSignup, errorMessage }) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  return (
    <>
      <Text h2 >Log In</Text>
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
      <Button
        title="Log In"
        onPress={() => onLogin(email, password)}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={{ marginTop: 15 }} onPress={onSignup}>
        <Text style={styles.signupText}>Don't have an account? Sign up here.</Text>
      </TouchableOpacity>
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
  },
  error: {
    marginTop: 15,
    fontSize: 16,
    color: "red"
  }
});

export default SigninForm;