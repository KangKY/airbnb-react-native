import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const LogOut = styled.TouchableOpacity`
  padding:10px;
  border:1px solid;
  border-radius: 15px;
  margin-bottom: 10px;
`;

export default ({isLoggedIn, logOut}) => (
  <Container>
    
    {isLoggedIn? (
      <>
      <LogOut onPress={logOut}>
        <Text>Log out</Text>
      </LogOut>
      <Text>Profile</Text>
      </>
    ):(
      <Text>Please Log In</Text>
    )}
   
  </Container>
);