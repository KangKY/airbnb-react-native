import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from '../redux/usersSlice';

export default () => {
  const { isLoggedIn, token } = useSelector((state)=>state.usersReducer)
  console.log(isLoggedIn, token);
  const dispatch = useDispatch()

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => dispatch(logOut())}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => dispatch(logIn({token:"tz"}))}>
          <Text>Log In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// const mapStateToProps = (state) => {
//   console.log(state)
//   return {isLoggedIn : false}
// }

// export default connect(mapStateToProps)(Gate)