import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Dimensions } from "react-native";
import PropTypes from "prop-types";
import colors from "../../colors";
import { ActivityIndicator } from "react-native";

const { width } = Dimensions.get("screen");

const Button = styled.View`
  border: 1px solid ${(props) => (props.accent ? "transparent" : colors.black)};
  border-radius: 30px;
  padding: 15px 0px;
  align-items: center;
  width: ${width / 1.5}px;
  background-color: ${(props) => (props.accent ? colors.red : "transparent")};
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => (props.accent ? "white" : colors.black)};
`;

const Btn = ({ loading, onPress, text, accent = false }) => (
  <TouchableOpacity onPress={loading ? null : onPress} style={{ marginBottom: 10 }}>
    <Button accent={accent}>
      {loading ? <ActivityIndicator color={accent? "white":"black"} /> : <Text accent={accent}>{text}</Text>}
    </Button>
  </TouchableOpacity>
);

Btn.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  loading: PropTypes.bool
};

export default Btn;
