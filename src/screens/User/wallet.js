// Wallet.js
import React, { useState } from 'react';
import { View, Text, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { updatePassword, auth ,updateEmailInWallet,query} from '../../../firebase'; // Import the auth object

export default function Wallet() {
  const [name, setCurrentname] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveWallet = async () => {
    try {
      // Perform the logic to check if the card details match and set the email
      // Assuming you have a function to check and set the email, update it accordingly
      const email = await checkAndSetEmail(name, Password);

      if (email) {
        console.log('Email set:', email);
      } else {
        console.log('Card details do not match.');
      }
    } catch (error) {
      console.log('Error saving wallet:', error);
    }
  };

  const checkAndSetEmail = async (mathe, password) => {
    try {
      // Replace this with your own logic to check if the card details match
      // and retrieve the associated email
      const email = auth.currentUser.email;
  
      // Update the user's email in the wallet collection
      await updateEmailInWallet(mathe, password, email);
  
      // Update the user's profile in the Firebase authentication
      await auth.currentUser.updateProfile({
        email: email
      });
  
      return email;
    } catch (error) {
      console.log('Error checking and setting email:', error);
      throw error;
    }
  };
  

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text fontSize={22} marginBottom={10} fontWeight="medium">
        Nhập ví của bạn
      </Text>
      <Input
        marginBottom={30}
        width={300}
        height={10}
        fontSize={16}
        variant="underlined"
        placeholder="Mã ví"
        onChangeText={setCurrentname}
        value={name}
      />
      <Input
        marginBottom={30}
        width={300}
        height={10}
        fontSize={16}
        variant="underlined"
        placeholder="Mật khẩu ví"
        onChangeText={setPassword}
        value={Password}
      />
      <Button fontSize={16} margin={10} borderRadius={30} width={300} onPress={handleSaveWallet}>
        Lưu ví
      </Button>
    </View>
  );
}
