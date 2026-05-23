import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { router } from 'expo-router';

import { auth } from '../../firebase/firebaseConfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getLoginErrorMessage = (error) => {
    switch (error?.code) {
      case 'auth/invalid-email':
        return 'Введіть коректний email.';
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Неправильний email або пароль.';
      case 'auth/too-many-requests':
        return 'Забагато спроб. Спробуйте пізніше.';
      case 'auth/operation-not-allowed':
        return 'У Firebase не увімкнено вхід через Email/Password.';
      case 'auth/network-request-failed':
        return 'Немає зʼєднання з мережею або Firebase недоступний.';
      default:
        return error?.message || 'Не вдалося виконати вхід.';
    }
  };

  const login = async () => {
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      Alert.alert('Помилка', 'Заповніть email і пароль.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, normalizedEmail, normalizedPassword);
      router.replace('/profile');
    } catch (error) {
      Alert.alert('Помилка входу', getLoginErrorMessage(error));
    }
  };

  const resetPassword = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      Alert.alert('Помилка', 'Введіть email для скидання пароля.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, normalizedEmail);
      Alert.alert('Успіх', 'Лист для скидання пароля надіслано.');
    } catch (error) {
      Alert.alert('Помилка', getLoginErrorMessage(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід</Text>

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

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.buttonText}>Реєстрація</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetPassword}>
        <Text>Забули пароль?</Text>
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
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
