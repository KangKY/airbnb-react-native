import React from "react";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { BlurView } from "expo-blur";
import Btn from "../../components/Auth/Btn";

const LOGO_URL =
  "http://logok.org/wp-content/uploads/2014/07/airbnb-logo-belo-219x286.png";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  position: absolute;
  z-index: -1;
`;

const BlurContainer = styled(BlurView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Logo = styled.Image`
  margin-top: 50px;
  width: 100px;
  height: 100px;
`;

const BtnContainer = styled.View``;

export default ({ navigation }) => {
  const goToSignUp = () => navigation.navigate("SignUp");
  const goToSignIn = () => navigation.navigate("SignIn");

  return (
  <Container>
    <BlurContainer intensity={40} >
      <Logo source={{ uri: LOGO_URL }} />
      <BtnContainer>
        <Btn onPress={goToSignUp} text={"회원가입"} accent={true} />
        <Btn onPress={goToSignIn} text={"로그인"} />
      </BtnContainer>
    </BlurContainer>
    <Image source={require("../../assets/loginBg.jpeg")} />
    <StatusBar style={"light"} />
  </Container>
  )
};
