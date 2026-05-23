import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

export default function ItemInfoScreen({ visible, item, onClose, formatBytes }) {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Атрибути об'єкта</Text>

          {item && (
            <View style={styles.infoGrid}>
              <Text style={styles.infoLabel}>Назва:</Text>
              <Text style={styles.infoValue}>{item.name}</Text>

              <Text style={styles.infoLabel}>Тип:</Text>
              <Text style={styles.infoValue}>
                {item.isDirectory ? 'Папка' : `${item.name.split('.').pop()} файл`}
              </Text>

              <Text style={styles.infoLabel}>Розмір:</Text>
              <Text style={styles.infoValue}>{formatBytes(item.size)}</Text>

              <Text style={styles.infoLabel}>Модифікація:</Text>
              <Text style={styles.infoValue}>
                {item.modificationTime ? new Date(item.modificationTime * 1000).toLocaleString() : 'Невідомо'}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.btnClose} onPress={onClose}>
            <Text style={styles.btnTextClose}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  infoGrid: {
    marginTop: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  btnClose: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginTop: 15,
    alignItems: 'center',
  },
  btnTextClose: {
    color: '#4B5563',
    fontWeight: '600',
  },
});