import { Button, Center, Text, View } from "native-base";
import { Ionicons, FontAwesome, Fontisto, MaterialCommunityIcons, index } from "@expo/vector-icons";
import { ScrollView } from "native-base";
import { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import WeekReportScreen from "./weekreport";
import MonthReportScreen from "./monthreport";
import { getWalletInfo } from "../../../firebase"; // Import the getWalletInfo function

export default function HomeScreen({ navigation }) {
  const [index, setindex] = useState(0);
  const [walletName, setWalletName] = useState(""); // State to store the wallet name

  useEffect(() => {
    // Fetch wallet info on component mount
    fetchWalletInfo();
  }, []);

  const fetchWalletInfo = async () => {
    try {
      const walletInfo = await getWalletInfo(); // Call the getWalletInfo function
      if (walletInfo) {
        const { ten } = walletInfo;
        setWalletName(ten);
      }
    } catch (error) {
      console.log("Error fetching wallet info:", error);
    }
  };

  return (
    <View pl={4} pr={4} flex={1}>
      <ScrollView>
        <View flexDirection={"row"}>
          <Text mr={2} fontWeight={"medium"} fontSize={22}>
            3.000.000 đ
          </Text>
        </View>
        <View>
          <Text mr={2} color={"gray.600"} fontWeight={"normal"} fontSize={14}>
            Số dư hiện tại
          </Text>
          <View
            paddingRight={6}
            pl={6}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderRadius={10}
            height={"16"}
            backgroundColor={"white"}
            flexDirection={"row"}
          >
            <View alignItems={"center"}>
              <Text color={"#767676"} fontWeight={"medium"} fontSize={18}>
                Thu nhập
              </Text>
              <Text color={"green.700"} fontSize={18}>
                +2.000.000 đ
              </Text>
            </View>
            <View alignItems={"center"}>
              <Text color={"#767676"} fontWeight={"medium"} fontSize={18}>
                Chi tiêu
              </Text>
              <Text color={"red.600"} fontSize={18}>
                -2.000.000 đ
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View
            alignItems={"flex-end"}
            mt={4}
            mb={0}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Text mr={2} color={"gray.600"} fontWeight={"normal"} fontSize={14}>
              {" "}
              Ví của tôi
            </Text>
            <Text mr={2} color={"gray.600"} fontWeight={"normal"} fontSize={12}>
              Xem tất cả
            </Text>
          </View>
          <View
            paddingRight={6}
            pl={6}
            paddingTop={2}
            pb={2}
            borderRadius={10}
            height={"20"}
            backgroundColor={"white"}
            flexDirection={"column"}
          >
            <View
              flex={"1"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <View alignItems={"center"} flexDirection={"row"}>
                <Fontisto name="wallet" size={24} color="#767676" />
                <Text ml={4}>Tiền mặt</Text>
              </View>
              <Text>1.000.000 đ</Text>
            </View>
            <View
              flex={"1"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <View alignItems={"center"} flexDirection={"row"}>
                <FontAwesome name="credit-card-alt" size={16} color="#767676" />
                <Text ml={4}>{walletName}</Text>
              </View>
              <Text>3.000.000 đ</Text>
            </View>
          </View>
        </View>
        <View>
          <Text mt={4} mb={0} color={"gray.600"} fontWeight={"normal"} fontSize={14}>
            Thống kê thu chi
          </Text>
          <View
            paddingRight={6}
            pl={6}
            paddingTop={2}
            pb={2}
            borderRadius={10}
            height={"200"}
            backgroundColor={"white"}
            flexDirection={"column"}
          >
            <BarChart
              data={{
                labels: ["Th", "T2", "T3", "T4", "T5", "T6", "T7"],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43, 23],
                  },
                ],
              }}
              width={360}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
        <View>
          <View
            alignItems={"flex-end"}
            mt={4}
            mb={0}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Text mr={2} color={"gray.600"} fontWeight={"normal"} fontSize={14}>
              Báo cáo
            </Text>
            <Text mr={2} color={"gray.600"} fontWeight={"normal"} fontSize={12}>
              Xem tất cả
            </Text>
          </View>
          <View
            paddingRight={6}
            pl={6}
            paddingTop={2}
            pb={2}
            borderRadius={10}
            height={"150"}
            backgroundColor={"white"}
            flexDirection={"column"}
          >
            <View
              flex={"1"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <View alignItems={"center"} flexDirection={"row"}>
                <MaterialCommunityIcons name="chart-pie" size={24} color="#767676" />
                <Text ml={4}>Báo cáo tuần</Text>
              </View>
              <Button
                size={"sm"}
                backgroundColor={"gray.300"}
                onPress={() => navigation.navigate("WeekReport")}
              >
                Xem
              </Button>
            </View>
            <View
              flex={"1"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <View alignItems={"center"} flexDirection={"row"}>
                <MaterialCommunityIcons
                  name="chart-bar-stacked"
                  size={24}
                  color="#767676"
                />
                <Text ml={4}>Báo cáo tháng</Text>
              </View>
              <Button
                size={"sm"}
                backgroundColor={"gray.300"}
                onPress={() => navigation.navigate("MonthReport")}
              >
                Xem
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
