import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from '../redux/usersSlice';
import Auth from "../navigation/Auth";
import { NavigationContainer } from "@react-navigation/native";

export default () => {
  const { isLoggedIn, token } = useSelector((state)=>state.usersReducer)
  const dispatch = useDispatch()

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => dispatch(logOut())}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
}

// const mapStateToProps = (state) => {
//   console.log(state)
//   return {isLoggedIn : false}
// }

// export default connect(mapStateToProps)(Gate)