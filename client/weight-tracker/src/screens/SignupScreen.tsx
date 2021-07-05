import React, { useContext } from "react";
import SignupForm from "../components/SignupForm";
import { Context as AuthContext } from "../context/AuthContext";

type Props = {
  navigation: any
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup } = useContext(AuthContext);

  return <>
    <SignupForm onSignup={signup} />
  </>
}

export default SignupScreen;