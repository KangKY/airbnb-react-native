import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import RoomCard from "../../../components/RoomCard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 0px;
`;

const FakeBar = styled.View`
  height: 40px;
  width: 100%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  margin: 20px 10px 10px 10px;
  border-radius: 7px;
  justify-content: center;
  padding-left: 10px;
`;

const FakeText = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

const FlatContainer = styled.FlatList`
  width: 100%;
  margin: 0px 10px;
`;

const LoadMore = styled.View`
  width: 100%;
  align-items: center;
  padding:5px 10px;
  background-color: #006a70;
  border-radius: 5px;
  margin-bottom: 30px;
`;

const LoadMoreText = styled.Text`
  color:white;
  font-size: 16px;
  font-weight: 500;
`;

export default ({ rooms = [], morePage, loading }) => {
  const navigation = useNavigation();
  return (
    <Container>
      {rooms.length === 0 ? (
        <ActivityIndicator color="black" />
      ) : (
        <>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Search")}>
            <FakeBar>
              <FakeText>Search...</FakeText>
            </FakeBar>
          </TouchableWithoutFeedback>
          <FlatContainer
            removeClippedSubviews={true}
            keyExtractor={(item) => item.id}
            data={rooms}
            onEndReached={morePage}
            onEndReachedThreshold={0.8}
            style={{
              padding: 10
            }}
            ListFooterComponent={loading && <ActivityIndicator />}
            renderItem={({ item }) => (
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
          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingTop: 30 }}
          >
            {rooms.map(room => (
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
            <TouchableOpacity onPress={morePage}>
              <LoadMore>
                <LoadMoreText>Load More</LoadMoreText>
              </LoadMore>
            </TouchableOpacity>
          </ScrollView>  */}
        </>
      )}
    </Container>
  );
};


