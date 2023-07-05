import React, { useState } from "react";
import { View, Text, Checkbox, Button, Modal, Input } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

function TransactionDetailsScreen({ route }) {
  const [edit, setEdit] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { transaction,userID } = route.params;
  
  const navigation = useNavigation();

  const [editedTransaction, setEditedTransaction] = useState({
    amount: transaction.amount || "",
    day: transaction.day || "",
    month: transaction.month || "",
    year: transaction.year || "",
    note: transaction.note || "",
  });

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Update the transaction data in Firestore
      console.log("Transaction ID:", transaction.userID);
  
      const transactionRef = doc(db, "transactions", transaction.id);
  
      const updatedFields = {
        amount: editedTransaction.amount,
        day: editedTransaction.day,
        month: editedTransaction.month,
        year: editedTransaction.year,
        note: editedTransaction.note,
      };
  
      await updateDoc(transactionRef, updatedFields);
  
      setModalVisible(false);
      console.log("Transaction updated successfully");
    } catch (error) {
      console.log("Error saving changes:", error);
    }
  };

  return (
    <View pt={2} pl={4} pr={4} flex={1}>
      <View pl={4} pr={4} pt={2} pb={2} borderRadius={10} background="white" height={86}>
        <Text mr={2} fontWeight="medium" fontSize={28}>
          Chi tiết giao dịch
        </Text>
      </View>
      <View>
        {edit ? (
          <View alignItems="flex-end" mt={4} mb={2} justifyContent="space-between" flexDirection="row">
            <View alignItems="flex-end" flexDirection="row">
              <Text ml={4} onPress={() => setEdit(false)} mr={2} color="gray.600" fontWeight="medium" fontSize={13}>
                Xong
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View alignItems="flex-end" mt={4} mb={2} justifyContent="space-between" flexDirection="row">
              <Text onPress={handleEditClick} mr={2} color="gray.600" fontWeight="medium" fontSize={20}>
                Chỉnh sửa
              </Text>
              <Text mr={2} color="gray.600" fontWeight="medium" fontSize={20}>
                Xóa
              </Text>
            </View>
          </View>
        )}
        <View flexDirection="row" alignItems="center" justifyContent="center">
          {edit ? (
            <View pr={2} pl={0}>
              <Checkbox value="test" accessibilityLabel=" " />
            </View>
          ) : (
            <View></View>
          )}
          <View paddingRight={4} pl={4} paddingTop={2} pb={2} borderRadius={10} minHeight={150} backgroundColor="white" flexDirection="column">
            <View flex={1} flexDirection="row" justifyContent="space-between" alignItems="flex-end">
              <View alignItems="center" flexDirection="row">
                <Text color="red.500" fontWeight="medium" ml={4}>
                  Loại: {transaction.category}
                </Text>
              </View>
              <Text color="red.500" fontWeight="medium">
                Số tiền: {transaction.amount} đ
              </Text>
            </View>
            <Text alignSelf="center" margin={0}>
              ─────────────────────
            </Text>
            <View flex={1} flexDirection="row" alignItems="center" justifyContent="space-between">
              <View alignItems="center" flexDirection="row">
                <Text fontWeight="medium" ml={4}>
                  Loại giao dịch: {transaction.category}
                </Text>
              </View>
            </View>
            <View flex={1} flexDirection="row" alignItems="center" justifyContent="space-between">
              <View alignItems="center" flexDirection="row">
                <Text fontWeight="medium" ml={4}>
                  Thời gian: {transaction.day}/{transaction.month}/{transaction.year}
                </Text>
              </View>
            </View>
            <View flex={1} flexDirection="row" alignItems="center" justifyContent="space-between">
              <View alignItems="center" flexDirection="row">
                <Text fontWeight="medium" ml={4}>
                  Ghi chú: {transaction.note}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Modal for editing transaction */}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Chỉnh sửa giao dịch</Modal.Header>
          <Modal.Body>
            <Text>Các trường thông tin giao dịch:</Text>
            <Input
              placeholder="Số tiền"
              value={editedTransaction.amount.toString()}
              onChangeText={(value) =>
                setEditedTransaction((prev) => ({
                  ...prev,
                  amount: value,
                }))
              }
            />
            <Input
              placeholder="Ngày"
              value={editedTransaction.day.toString()}
              onChangeText={(value) =>
                setEditedTransaction((prev) => ({
                  ...prev,
                  day: value,
                }))
              }
            />
            <Input
              placeholder="Tháng"
              value={editedTransaction.month.toString()}
              onChangeText={(value) =>
                setEditedTransaction((prev) => ({
                  ...prev,
                  month: value,
                }))
              }
            />
            <Input
              placeholder="Năm"
              value={editedTransaction.year.toString()}
              onChangeText={(value) =>
                setEditedTransaction((prev) => ({
                  ...prev,
                  year: value,
                }))
              }
            />
            <Input
              placeholder="Ghi chú"
              value={editedTransaction.note}
              onChangeText={(value) =>
                setEditedTransaction((prev) => ({
                  ...prev,
                  note: value,
                }))
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme="blue" mr={1} onPress={handleSaveChanges}>
              Lưu
            </Button>
            <Button onPress={() => setModalVisible(false)}>Hủy</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

export default TransactionDetailsScreen;
