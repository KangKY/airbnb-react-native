import { connect } from "react-redux";
import ExploreContainer from "./ExploreContainer";
import { getRooms, morePage } from "../../../redux/roomSlice";

function mapDispatchToProps(dispatch) {
  return {
    getRooms: (page) => dispatch(getRooms(page)),
    morePage: (e) =>  {
      console.log(e)
      dispatch(morePage())
    }
  }
}

function mapStateToProps(state) {
  return state.roomsReducer.explore
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);