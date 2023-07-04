import { Text, View } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function lastMonth() {
  const navigation = useNavigation();
  const [totalThuNhap, setTotalThuNhap] = useState(0);
  const [totalChiTieu, setTotalChiTieu] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const db = getFirestore();
        const transactionsRef = collection(db, 'transaction');

        // Calculate total Thu nhập
        const thuNhapQuery = query(
          transactionsRef,
          where('userId', '==', getCurrentUserId()),
          where('month', '==', 7),
          where('year', '==', 2023),
          where('transactionType', '==', 'thunhap')
        );
        const thuNhapQuerySnapshot = await getDocs(thuNhapQuery);
        let totalThuNhap = 0;
        thuNhapQuerySnapshot.forEach((doc) => {
          const transaction = doc.data();
          const amount = parseFloat(transaction.amount);
          totalThuNhap += amount;
        });
        setTotalThuNhap(totalThuNhap);

        // Calculate total Chi tiêu
        const chiTieuQuery = query(
          transactionsRef,
          where('userId', '==', getCurrentUserId()),
          where('month', '==', 7),
          where('year', '==', 2023),
          where('transactionType', '==', 'chitieu')
        );
        const chiTieuQuerySnapshot = await getDocs(chiTieuQuery);
        let totalChiTieu = 0;
        chiTieuQuerySnapshot.forEach((doc) => {
          const transaction = doc.data();
          const amount = parseFloat(transaction.amount);
          totalChiTieu += amount;
        });
        setTotalChiTieu(totalChiTieu);
      } catch (error) {
        console.log('Error retrieving transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const getCurrentUserId = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    return currentUser ? currentUser.uid : '';
  };

  return (
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
            {"+"} {totalThuNhap} đ
          </Text>
        </View>
        <View
          flex={"1"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text fontWeight={"medium"} color={"red.500"}>
            Chi tiêu
          </Text>
          <Text fontWeight={"medium"} color={"red.500"}>
            {"-"} {totalChiTieu} đ
          </Text>
        </View>
        <View alignSelf={"flex-end"}>
          <Text margin={-2}>────────</Text>
          <Text fontWeight={"medium"} alignSelf={"flex-end"}>
            {totalThuNhap - totalChiTieu} đ
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
            Tìm kiếm
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('transactiondetails')}>
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
                <MaterialCommunityIcons
                  name="fuel"
                  size={24}
                  color={"rgba(255, 0, 0, 1)"}
                />
                <Text color={"red.500"} fontWeight={"medium"} ml={4}>
                  Đi lại
                </Text>
              </View>

              <Text color={"red.500"} fontWeight={"medium"}>
                3.000.000 đ
              </Text>
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
        </TouchableOpacity>
      </View>
    </View>
  );
}
