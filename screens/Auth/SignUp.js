import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";
import api from "../../api";
import Btn from "../../components/Auth/Btn";
import Input from "../../components/Auth/Input";
import DismissKeyboard from "../../components/DismissKeyboard";
import utils from "../../utils";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default ({navigation}) => {
  const [username, setUsername] = useState("강경일");
  const [email, setEmail] = useState("ruddlf4933@naver.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    if (username === "" || email === "" || password === "") {
      alert("모든 필드를 입력해주세요.");
      return false;
    }
    if (!utils.isEmail(email)) {
      alert("올바른 이메일 주소가 아닙니다.");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if(!isFormValid()) {
      return false;
    }
    setLoading(true);
    try {
      const { status } = await api.createAccount({
        email,
        username,
        password,
      });
      console.log(status);

      if(status === 201) {
        alert("회원 가입되었습니다. 로그인해주세요.");
        navigation.navigate("SignIn", { email, password })
      } else {
        throw Error;
      }
    } catch (e) {
      alert(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "position"}
        >
          <InputContainer>
            <Input
              value={username}
              placeholder="Username"
              autoCapitalize="none"
              stateFn={setUsername}
            />
            <Input
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              stateFn={setEmail}
            />
            <Input
              value={password}
              placeholder="Password"
              isPassword={true}
              autoCapitalize="none"
              stateFn={setPassword}
            />
          </InputContainer>
          <Btn
            loading={loading}
            text={"회원가입"}
            accent
            onPress={handleSubmit}
          ></Btn>
        </KeyboardAvoidingView>
        <StatusBar style="dark" />
      </Container>
    </DismissKeyboard>
  );
};
