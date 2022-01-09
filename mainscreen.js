import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AppView } from "@components";
import { useTheme } from "styled-components";
import { getMarketData } from "@utils/getMarketData";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleThemeSwitch,
  showNotifyToast,
  getMarketList,
} from "@store/modules";
import CoinList from "./CoinList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect } from "@react-navigation/native";

export default function Market({ navigation }) {
  const { Navigator, Screen } = createMaterialTopTabNavigator();
  const { marketApiData, marketApiLoading } = useSelector(
    (state) => state.marketApi
  );

  const [marketPage, setMarketPage] = useState(1);
  const [marketData, setMarketData] = useState([]);
  const dispatch = useDispatch();
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
  {
    /*
  useLayoutEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setMarketReady(true);
      setMarketData(marketData);
    };

    fetchMarketData();
  }, []);

*/
  }
  useEffect(() => {
    onEndReached();
  }, []);

  const onEndReached = () => {
    dispatch(getMarketList("usd", "market_cap_desc", 15, marketPage));
    setMarketPage(marketPage + 1);
    setMarketData([...marketData, ...marketApiData]);
  };

  const Market = () => {
    return (
      <AppView>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          data={marketData}
          extraData={marketApiLoading}
          renderItem={({ item }) => (
            <CoinList {...item} current_price={formatUSD(item.current_price)} />
          )}
          keyExtractor={(item, index) => index}
          ListFooterComponent={
            !marketApiLoading ? null : (
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
            )
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.15}
          initialNumToRender={14}
          disableVirtualization={true}
        />
      </AppView>
    );
  };

  const Watchlist = () => {
    return (
      <AppView justifyCenter alignCenter>
        <Text style={{ color: useTheme().colors.primaryTextColor }}>
          Voce ainda nao tem uma WATCHLIST.
        </Text>
      </AppView>
    );
  };

  return (
    <AppView>
      <View
        style={{
          height: 50,
          backgroundColor: useTheme().colors.backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>HEADER</Text>
      </View>
      <Navigator
        initialRouteName={"Setting"}
        screenOptions={{
          headerShown: false,
          tabBarPressOpacity: 1,
          tabBarPressColor: "transparent",
          tabBarStyle: {
            backgroundColor: useTheme().colors.backgroundColor,
            borderColor: "red",
          },
          tabBarLabelStyle: { color: useTheme().colors.primaryTextColor },
          tabBarIndicatorStyle: { backgroundColor: "#333" },
        }}
      >
        <Screen
          name="Market"
          component={Market}
          screenOptions={{
            headerShown: false,
            tabBarPressOpacity: 1,
            tabBarPressColor: "transparent",
            tabBarStyle: {
              backgroundColor: useTheme().colors.backgroundColor,
              borderColor: "red",
            },
            tabBarActiveTintColor: "#333",

            tabBarIndicatorStyle: { borderColor: "red" },
          }}
        />
        <Screen name="Watchlist" component={Watchlist} />
      </Navigator>
    </AppView>
  );
}
