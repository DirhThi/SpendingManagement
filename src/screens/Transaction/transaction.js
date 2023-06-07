import {
  Center,
  Text,
  Input,
  Button,
  View,
  Image,
  StatusBar,
} from "native-base";
import {
  Ionicons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  index,
} from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";

const lastMonth = () => (
  <View pt={4} pl={4} pr={4} flex={1}>
    <View background={"white"} height={"72"}></View>
  </View>
);

const thisMonth = () => (
  <View pt={2} pl={4} pr={4} flex={1}>
    <View
      pl={4}
      pr={4}
      pt={2}
      pb={2}
      borderRadius={10}
      background={"white"}
      height={"86"}
    >
      <View flex={"1"} flexDirection={"row"} justifyContent={"space-between"}>
        <Text fontWeight={"medium"} color={"#1FA97C"}>
          Thu nhập
        </Text>
        <Text fontWeight={"medium"} color={"#1FA97C"}>
          {"+"} 3.000.000 đ
        </Text>
      </View>
      <View
        flex={"1"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontWeight={"medium"} color={"#1FA97C"}>
          Chi tiêu
        </Text>
        <Text fontWeight={"medium"} color={"red.500"}>
          {" "}
          {"-"}2.000.000 đ
        </Text>
      </View>
      <View alignSelf={"flex-end"}>
        <Text margin={-2}>────────</Text>
        <Text fontWeight={"medium"} alignSelf={"flex-end"}>
          1.000.000 đ
        </Text>
      </View>
    </View>
    <View>
      <View
        alignItems={"flex-end"}
        mt={4}
        mb={2}
        justifyContent={"space-between"}
        flexDirection={"row"}
      >
        <Text mr={2} color={"gray.600"} fontWeight={"medium"} fontSize={14}>
          Danh sách giao dịch
        </Text>
        <Text mr={2} color={"gray.600"} fontWeight={"medium"} fontSize={12}>
          Xem tất cả
        </Text>
      </View>
      <View
        paddingRight={6}
        pl={6}
        paddingTop={2}
        pb={2}
        borderRadius={10}
        minHeight={"150"}
        backgroundColor={"white"}
        flexDirection={"column"}
      >
        <View
          flex={"1"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          <View alignItems={"center"} flexDirection={"row"}>
            <Text mr={2} fontWeight={"semibold"} fontSize={34}>
              07
            </Text>
            <View alignSelf={"flex-end"}>
              <Text mb={-1} fontSize={12}>
                Thứ ba
              </Text>
              <Text mb={-1} fontSize={12}>
                Tháng 3, 2023
              </Text>
            </View>
          </View>
          <Text fontWeight={"medium"}>3.000.000 đ</Text>
        </View>
        <Text alignSelf={"center"} margin={0}>
          ─────────────────────
        </Text>
        <View
          flex={"1"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <View alignItems={"center"} flexDirection={"row"}>
          <MaterialCommunityIcons name="fuel" size={24} color={"rgba(255, 0, 0, 1)"} />
            <Text color={"red.500"} fontWeight={"medium"} ml={4}>
              Đi lại
            </Text>
          </View>

          <Text color={"red.500"} fontWeight={"medium"}>3.000.000 đ</Text>
        </View>
        <View
          flex={"1"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <View alignItems={"center"} flexDirection={"row"}>
            <MaterialCommunityIcons
              name="wallet-plus"
              size={24}
              color="#767676"
            />
            <Text fontWeight={"medium"} color={"#767676"} ml={4}>
              Nạp tiền
            </Text>
          </View>

          <Text color={"#767676"} fontWeight={"medium"}>
            3.000.000 đ
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const renderScene = SceneMap({
  first: lastMonth,
  second: thisMonth,
});

export default function TransactionScreen() {
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "first", title: "Tháng trước" },
    { key: "second", title: "Tháng này" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "green" }}
          style={{ padding: 0, backgroundColor: "transparent" }}
          tabStyle={{ maxHeight: 50 }} // here
          renderLabel={({ route, focused, color }) => (
            <View>
              {focused ? (
                <View>
                  <Text fontWeight={"medium"} fontSize={16} color={"black"}>
                    {route.title}
                  </Text>
                  <View height={3} width={300} color={"green.700"}></View>
                </View>
              ) : (
                <Text fontSize={16} color={"grey"}>
                  {route.title}
                </Text>
              )}
            </View>
          )}
        ></TabBar>
      )}
    />
  );
}