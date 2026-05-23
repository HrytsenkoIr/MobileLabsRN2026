import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Edit3 } from 'lucide-react-native';

export default function FileEditorScreen({ visible, file, content, onChangeContent, onClose, onSave }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderRow}>
            <Edit3 size={20} color="#1F2937" />
            <Text style={styles.modalTitle} numberOfLines={1}>{file?.name}</Text>
          </View>

          <TextInput
            style={styles.fileViewArea}
            value={content}
            onChangeText={onChangeContent}
            multiline={true}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnTextCancel}>Закрити</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnConfirm} onPress={onSave}>
              <Text style={styles.btnTextConfirm}>Зберегти</Text>
            </TouchableOpacity>
          </View>
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
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  fileViewArea: {
    height: 250,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  btnCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  btnTextCancel: {
    color: '#4B5563',
    fontWeight: '600',
  },
  btnConfirm: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#4F46E5',
  },
  btnTextConfirm: {
    color: '#FFF',
    fontWeight: '600',
  },
});