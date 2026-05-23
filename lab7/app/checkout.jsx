import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { saveUserData } from "../redux/slices/usersSlice";

import { addOrder } from "../redux/slices/ordersSlice";

import { clearCart } from "../redux/slices/cartSlice";

import { router } from "expo-router";

export default function CheckoutScreen() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !address
    ) {
      Alert.alert(
        "Помилка",
        "Заповніть усі поля"
      );

      return;
    }

    dispatch(
      saveUserData({
        fullName,
        email,
        phone,
        address,
      })
    );

    dispatch(
      addOrder({
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cartItems,
        total,
      })
    );

    dispatch(clearCart());

    Alert.alert(
      "Успіх",
      "Замовлення оформлено"
    );

    router.push("/orders");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ПІБ"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Телефон"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Адреса"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Button
        title="Підтвердити"
        onPress={handleOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
});