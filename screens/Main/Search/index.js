import { connect } from "react-redux";
import SearchContainer from "./SearchContainer";


const mapStateToProps = (state) => {
  return {
    token: state.usersReducer.token
  }
}
export default connect(mapStateToProps, null)(SearchContainer);