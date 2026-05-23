import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

import { auth } from '../../firebase/firebaseConfig';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getRegisterErrorMessage = (error) => {
    switch (error?.code) {
      case 'auth/invalid-email':
        return 'Введіть коректний email.';
      case 'auth/email-already-in-use':
        return 'Користувач з таким email вже існує.';
      case 'auth/weak-password':
        return 'Пароль має містити щонайменше 6 символів.';
      case 'auth/operation-not-allowed':
        return 'У Firebase не увімкнено реєстрацію через Email/Password.';
      case 'auth/network-request-failed':
        return 'Немає зʼєднання з мережею або Firebase недоступний.';
      default:
        return error?.message || 'Не вдалося створити акаунт.';
    }
  };

  const register = async () => {
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      Alert.alert('Помилка', 'Заповніть email і пароль.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        normalizedPassword
      );
      router.replace('/profile');
    } catch (error) {
      Alert.alert('Помилка реєстрації', getRegisterErrorMessage(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Пароль"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Створити акаунт</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
