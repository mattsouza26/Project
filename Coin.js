import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { useTheme } from "styled-components";
import { LineChart } from "react-native-svg-charts";

const CoinList = ({
  navigation,
  id,
  symbol,
  name,
  image,
  current_price,
  price_change_percentage_24h,
  sparkline_in_7d,
  price_change_percentage_7d_in_currency,
}) => {
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  const onLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setGraphSize({
      width: width,
      height: height,
    });
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: useTheme().theme === "dark" ? "#1e1e1e" : "#fafafa",
        paddingHorizontal: 10,
        paddingVertical: 7.5,
        marginVertical: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        height: 65,
        elevation: 1,
      }}
    >
      <View style={{ paddingHorizontal: 7.5, justifyContent: "center" }}>
        <Image source={{ uri: image }} style={{ height: 35, width: 35 }} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 5, justifyContent: "center" }}>
        <Text
          numberOfLines={1}
          style={{ color: useTheme().colors.primaryTextColor, fontSize: 16 }}
        >
          {name}
        </Text>
        <Text style={{ color: "#C2C2C2", fontSize: 12 }}>{symbol}</Text>
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: "center",
          alignItems: "center",
        }}
        onLayout={onLayout}
      >
        {/* 
        <LineChart
          style={{
            height: graphSize?.height,
            width: graphSize?.width,
            backgroundColor: "transparent",
          }}
          data={sparkline_in_7d.price}
          svg={{
            stroke:
              price_change_percentage_7d_in_currency > 0
                ? "#0ecb81"
                : "#f6465d",
            strokeWidth: 1.25,
            fillOpacity: 0.25,
            y: 5,
          }}
          numberOfTicks={5}
          contentInset={{ top: 7.5, bottom: 7.5 }}
        ></LineChart>
        */}
      </View>
      <View
        name="price"
        style={{
          minWidth: 100,
          paddingHorizontal: 5,
          marginRight: 7.5,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: useTheme().colors.primaryTextColor,
            fontSize: 16,
          }}
        >
          {current_price}
        </Text>
        <Text
          style={{
            color:
              price_change_percentage_7d_in_currency > 0
                ? "#0ecb81"
                : "#f6465d",
            fontSize: 12,
            justifyContent: "flex-end",
          }}
        >
          {price_change_percentage_7d_in_currency?.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CoinList;
