import { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

import { AuthContext } from '../../context/AuthContext';

import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import {
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser
} from 'firebase/auth';

import { auth, db } from '../../firebase/firebaseConfig';
import { router } from 'expo-router';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const ref = doc(db, 'users', user.uid);

    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      const data = snapshot.data();

      setName(data.name);
      setAge(data.age);
      setCity(data.city);
    }
  };

  const saveProfile = async () => {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      age,
      city
    });

    Alert.alert('Збережено');
  };

  const logout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  const removeAccount = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        password
      );

      await reauthenticateWithCredential(user, credential);

      await deleteUser(user);

      Alert.alert('Акаунт видалено');

      router.replace('/login');
    } catch {
      Alert.alert('Помилка');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль</Text>

      <TextInput
        placeholder="Ім’я"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Вік"
        style={styles.input}
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        placeholder="Місто"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Зберегти</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Пароль для видалення"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={removeAccount}
      >
        <Text style={styles.buttonText}>Видалити акаунт</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },

  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center'
  },

  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10
  },

  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10
  },

  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});