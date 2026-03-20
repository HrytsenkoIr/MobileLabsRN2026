import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useContext(AppContext);
  const isLight = theme === 'light';

  return (
    <View style={[styles.container, { backgroundColor: isLight ? '#f5f5f5' : '#121212', justifyContent: 'center' }]}>
      <TouchableOpacity style={styles.btn} onPress={toggleTheme}>
        <Text style={styles.btnText}>Switch to {isLight ? 'Dark' : 'Light'} Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});