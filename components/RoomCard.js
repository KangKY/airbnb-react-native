import Pt from "prop-types";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-web-swiper";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { toggleFav } from "../redux/usersSlice";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('screen')

const Container = styled.View`
  width: 100%;
  margin-bottom: 20px;
  align-items: flex-start;
  position: relative;
`;

const Name = styled.Text`
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 3px;
`;

const Superhost = styled.View`
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 5px;
`;

const SuperhostText = styled.Text`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
`;

const PriceText = styled.Text`
  font-size: 14px;
`;

const PriceNumber = styled.Text`
  font-weight: 800;
  font-size: 13px;
`;

const PhotosContainer = styled.View`
  margin-bottom: 10px;
  height: ${height / 4.5}px;
  width: 100%;
  background-color: red;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const FavButton = styled.View`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const TOpacity = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
`;

function getIconName(isFav) {
  const isAndroid = utils.isAndroid();
  if (isAndroid) {
    if (isFav) {
      return "md-heart";
    }
    return "md-heart-outline";
  } else {
    if (isFav) {
      return "ios-heart";
    }
    return "ios-heart-outline";
  }
}

const RoomCard = ({ id, isFav, isSuperHost, photos = [], name, price, roomObj }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (

    <Container>
      <TOpacity onPress={() => dispatch(toggleFav(id))}>
        <FavButton>
          <Ionicons
            size={28}
            color={isFav ? colors.red : "black"}
            name={getIconName(isFav)}
          />
        </FavButton>
      </TOpacity>

      <PhotosContainer>
        {photos.length === 0 ? (
          <SlideImage
            resizeMode="repeat"
            source={require("../assets/roomDefault.jpeg")}
          />
        ) : (
          <Swiper
            controlsProps={{
              PrevComponent: () => null,
              NextComponent: () => null,
              dotActiveStyle: {
                backgroundColor: "white"
              }
            }}
          >
            {photos.map(photo => (
              <SlideImage key={photo.id} source={{ uri: photo.file }} />
            ))}
          </Swiper>
        )}
      </PhotosContainer>
      <TouchableOpacity 
        style={{ alignItems: "flex-start" }} 
        onPress={() => navigation.navigate("RoomDetail", {...roomObj})}
      >
        {isSuperHost ? (
          <Superhost>
            <SuperhostText>Superhost</SuperhostText>
          </Superhost>
        ) : null}
        <Name>{name}</Name>
        <PriceContainer>
          <PriceNumber>${price}</PriceNumber>
          <PriceText> / 1박</PriceText>
        </PriceContainer>
      </TouchableOpacity>

    </Container>
  )
};

RoomCard.propTypes = {
  id: Pt.number.isRequired,
  isFav: Pt.bool.isRequired,
  isSuperHost: Pt.bool.isRequired,
  photos: Pt.arrayOf(
    Pt.shape({
      file: Pt.string
    })
  ),
  name: Pt.string.isRequired,
  price: Pt.number.isRequired
};
export default RoomCard;