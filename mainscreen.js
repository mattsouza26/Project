import React, { useEffect, useState } from "react";
import { AppView } from "@components";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getMarketList } from "@store/modules";
import { default as CoinList } from "./CoinList";

export default function Market({ navigation }) {
  const dispatch = useDispatch();
  const { marketApiData, marketApiLoading } = useSelector(
    (state) => state.marketApi
  );
  const [marketData, setMarketData] = useState([]);
  const [marketPage, setMarketPage] = useState(1);

  const formatUSD = (value) => {
    if (value === "") {
      const formattedValue = `$${value.toLocaleString("en-US", {
        currency: "USD",
      })}`;
      return formattedValue;
    }
    const formattedValue = `$${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    return formattedValue;
  };

  const onEndReached = async () => {
    await dispatch(getMarketList("usd", "market_cap_desc", 15, marketPage));
    setMarketPage(marketPage + 1);
  };
  useEffect(() => {
    onEndReached();
  }, []);

  useEffect(() => {
    setMarketData([...marketData, ...marketApiData]);
  }, [marketApiData]);

  return (
    <AppView>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        data={marketData}
        renderItem={({ item }) => (
          <CoinList {...item} current_price={formatUSD(item.current_price)} />
        )}
        keyExtractor={(item, index) => String(item.id)}
        ListFooterComponent={<ListFooterComponent loading={marketApiLoading} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        initialNumToRender={15}
      />
    </AppView>
  );
}
function ListFooterComponent(loading) {
  if (!loading) return null;
  return (
    <View
      style={{
        padding: 7.5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <ActivityIndicator
        animating
        color={useTheme().colors.primaryTextColor}
        size={"large"}
        style={{ margin: 15 }}
      />
    </View>
  );
}
