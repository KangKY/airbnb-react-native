import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import RoomCard from "../../../components/RoomCard";

const Container = styled.SafeAreaView`
  margin-top: 20px;
  padding-bottom: 0px;
`;

const SV = styled.ScrollView``;

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const NoFavs = styled.Text``;

const Text = styled.Text``;
export default ({rooms = []}) => {
  return(
    <Container>
      <Title>좋아요 ({rooms.length})</Title>

      <FlatList
        removeClippedSubviews={true}
		    keyExtractor={(item) => item.id}
        data={rooms}
        style={{
          padding:10,
          marginBottom:30
        }}
        renderItem={({ item })=>(
          <RoomCard
            key={item.id}
            name={item.name}
            price={item.price}
            photos={item.photos}
            id={item.id}
            isFav={item.is_fav}
            isSuperHost={item.user.superhost}
            roomObj={item}
          />
        )}
      />
      {/* <SV
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {rooms.length !== 0 ? (
          rooms.map(room => (
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
          ))
        ) : (
          <NoFavs>You don't have any favs.</NoFavs>
        )}
      </SV> */}
    </Container>
  )
}
