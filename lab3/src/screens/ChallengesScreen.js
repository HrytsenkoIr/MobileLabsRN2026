import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function ChallengesScreen() {
  const { challenges, theme } = useContext(AppContext);
  const isLight = theme === 'light';

  return (
    <View style={[styles.container, { backgroundColor: isLight ? '#f5f5f5' : '#121212' }]}>
      {challenges.map(ch => (
        <View key={ch.id} style={[styles.chCard, { backgroundColor: isLight ? '#fff' : '#1e1e1e', borderColor: ch.done ? '#4CD964' : '#ccc' }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.chText, { color: isLight ? '#000' : '#fff', textDecorationLine: ch.done ? 'line-through' : 'none' }]}>
              {ch.text}
            </Text>
            <Text style={{ color: '#888' }}>Progress: {ch.current} / {ch.target}</Text>
          </View>
          <View style={[styles.statusRadio, { backgroundColor: ch.done ? '#4CD964' : 'transparent' }]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  chCard: { flexDirection: 'row', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center', borderWidth: 1 },
  chText: { fontSize: 16, fontWeight: '600' },
  statusRadio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#4CD964' }
});