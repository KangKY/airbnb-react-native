import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  padding-left: 0px;
`;
const isAndroid = Platform.OS === "android";

export default () => (
  <Container>
    <Ionicons
      name={isAndroid ? "ios-arrow-down" : "ios-arrow-down"}
      size={28}
    />
  </Container>
);
