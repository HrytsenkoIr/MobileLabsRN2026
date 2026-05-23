import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HardDrive } from 'lucide-react-native';

export default function StorageStats({ stats, formatBytes }) {
  if (!stats) return null;

  return (
    <View style={styles.storageCard}>
      <View style={styles.storageHeader}>
        <HardDrive size={20} color="#4F46E5" />
        <Text style={styles.storageTitle}>Пам'ять пристрою</Text>
      </View>
      <View style={styles.storageGrid}>
        <Text style={styles.storageText}>Всього: {formatBytes(stats.total)}</Text>
        <Text style={styles.storageText}>Вільно: {formatBytes(stats.free)}</Text>
        <Text style={styles.storageText}>Зайнято: {formatBytes(stats.used)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  storageCard: {
    backgroundColor: '#FFF',
    margin: 12,
    padding: 14,
    borderRadius: 12,
    elevation: 3,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  storageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storageText: {
    fontSize: 12,
    color: '#4B5563',
  },
});