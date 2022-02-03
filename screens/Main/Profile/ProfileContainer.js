import React, { useEffect } from 'react';
import ProfilePresenter from "./ProfilePresenter";

export default ({ logOut, isLoggedIn }) => {
  console.log("Profile")
  return (
    <ProfilePresenter isLoggedIn={isLoggedIn} logOut={logOut}/>
  )
}