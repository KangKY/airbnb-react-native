import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Keyboard } from "react-native";
import styled from "styled-components/native";
import colors from "../../../colors";
import DismissKeyboard from "../../../components/DismissKeyboard";
import api from "../../../api";
import RoomCard from "../../../components/RoomCard";


const Wrapper = styled.View`
  /* flex: 1; */
`;
const Container = styled.View`
   padding: 0px;
`;

const SearchContainer = styled.View`
  margin-top: 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 1px 5px 50px rgba(200, 200, 200, 0.5);
`;
const SearchBar = styled.TextInput`
  height: 40px;
  width: 90%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  border-radius: 7px;
  justify-content: center;
  padding-left: 10px;
`;
const CancelContainer = styled.TouchableOpacity``;

const CancelText = styled.Text``;

const FiltersContainer = styled.ScrollView`
  flex-direction: row;
  margin-top: 0px;
`;

const FilterContainer = styled.View`
  align-items: center;
  margin-right: 15px;
`;

const FilterLabel = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Filter = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 1px 2.5px 2.5px rgba(200, 200, 200, 0.8);
  width: 80px;
`;

const SearchBtn = styled.TouchableOpacity`
  background-color: ${colors.red};
  padding: 10px;
  margin: 10px 30px;
  border-radius: 10px;
  align-items: center;
`;

const SearchText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const ResultsText = styled.Text`
  margin-top: 5px;
  font-size: 16px;
  text-align: center;
`;

const Results = styled.ScrollView`
  margin-top: 25px;
`;

export default ({ token }) => {
  const navigation = useNavigation();
  const [searching, setSearching] = useState(false);
  const [keyword, setKeyword] = useState();
  const [beds, setBeds] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [results, setResults] = useState();

  const triggerSearch = async () => {
    // call the api
    setSearching(true);
    const form = {
      ...(keyword && { keyword }),
      ...(beds && { beds }),
      ...(bedrooms && { bedrooms }),
      ...(bathrooms && { bathrooms }),
      ...(maxPrice && { max_price: maxPrice }),
      ...(minPrice && { min_price: minPrice })
    };
    console.log(form);
    try {
      const { data } = await api.search(form, token);
      setResults(data);
    } catch (e) {
      console.warn(e);
    } finally {
      Keyboard.dismiss();
      setSearching(false);
    }
  };

  return (
    <DismissKeyboard>
      <>
        <Container>
          <SearchContainer>
            <SearchBar autoFocus={true}
              onChangeText={(text) => setKeyword(text)}
              value={keyword}
              placeholder="방 이름을 작성해주세요." />
            <CancelContainer onPress={() => navigation.goBack()}>
              <CancelText>취소</CancelText>
            </CancelContainer>
          </SearchContainer>
          <FiltersContainer
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
          >
            <FilterContainer>
              <FilterLabel>Beds</FilterLabel>
              <Filter
                onChangeText={text => setBeds(text)}
                value={beds}
                placeholder="0"
                keyboardType={"number-pad"}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Bedrooms</FilterLabel>
              <Filter
                onChangeText={text => setBedrooms(text)}
                value={bedrooms}
                placeholder="0"
                keyboardType={"number-pad"}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Bathrooms</FilterLabel>
              <Filter
                onChangeText={text => setBathrooms(text)}
                value={bathrooms}
                placeholder="0"
                keyboardType={"number-pad"}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Max. price</FilterLabel>
              <Filter
                onChangeText={text => setMaxPrice(text)}
                value={maxPrice}
                placeholder="$0"
                keyboardType={"number-pad"}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Min. price</FilterLabel>
              <Filter
                onChangeText={text => setMinPrice(text)}
                value={minPrice}
                placeholder="$0"
                keyboardType={"number-pad"}
              />
            </FilterContainer>
          </FiltersContainer>
        </Container>
        <SearchBtn onPress={searching ? null : triggerSearch}>
          {searching ? (
            <ActivityIndicator color="white" />
          ) : (
            <SearchText>Search</SearchText>
          )}
        </SearchBtn>
        {results ? (
          <ResultsText>Showing {results.count} results</ResultsText>
        ) : null}
        <Results contentContainerStyle={{ paddingHorizontal: 15 }}>
          {results?.results?.map(room => (
            <RoomCard
              key={room.id}
              name={room.name}
              price={room.price}
              photos={room.photos}
              id={room.id}
              isFav={room.is_fav}
              isSuperHost={room.user.superhost}
              roomObj={room}
            />
          ))}
        </Results>
      </>
    </DismissKeyboard>
  )
};