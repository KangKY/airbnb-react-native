import { connect } from "react-redux";
import ProfileContainer from "./ProfileContainer";
import { logOut } from "../../../redux/usersSlice";

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(logOut())
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.usersReducer.isLoggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);