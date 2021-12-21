import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import Input from "../../components/Auth/Input";
import DismissKeyboard from "../../components/DismissKeyboard";
import utils from "../../utils";
import { userLogin } from "../../redux/usersSlice";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(params?.email);
  const [password, setPassword] = useState(params?.password);
  const isFormValid = () => {
    if (email === "" || password === "") {
      alert("모든 필드를 입력해주세요.");
      return false;
    }
    if (!utils.isEmail(email)) {
      alert("올바른 이메일 주소가 아닙니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }

    dispatch(userLogin({ email, password }));
  };

  return (
    <DismissKeyboard>
      <Container>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "position"}
        >
          <InputContainer>
            <Input
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              stateFn={setEmail}
            />
            <Input
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              isPassword={true}
              stateFn={setPassword}
            />
          </InputContainer>
          <Btn text={"로그인"} accent onPress={handleSubmit}></Btn>
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
