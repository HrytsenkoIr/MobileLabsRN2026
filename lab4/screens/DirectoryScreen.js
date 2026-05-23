import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView
} from 'react-native';
import { Folder, FileText, ArrowLeft, Plus } from 'lucide-react-native';

export default function DirectoryScreen({
  currentDir,
  dirContent,
  isRoot,
  onNavigateUp,
  onItemPress,
  onItemInfo,
  onItemDelete,
  onCreateItem,
  formatPath,
  formatBytes
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [isFolder, setIsFolder] = useState(true);
  const [fileContent, setFileContent] = useState('');

  const handleCreate = () => {
    if (!itemName.trim()) return;
    onCreateItem(itemName.trim(), isFolder, fileContent);
    setModalVisible(false);
    setItemName('');
    setFileContent('');
  };

  return (
    <View style={styles.subContainer}>
      <View style={styles.navBar}>
        {!isRoot && (
          <TouchableOpacity onPress={onNavigateUp} style={styles.backButton}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
        )}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.pathText}>
            {formatPath ? formatPath(currentDir) : (currentDir || 'root/')}
          </Text>
        </ScrollView>
      </View>

      <FlatList
        data={dirContent}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity style={styles.itemClickable} onPress={() => onItemPress(item)}>
              {item.isDirectory ? (
                <Folder size={28} color="#F59E0B" style={styles.itemIcon} />
              ) : (
                <FileText size={28} color="#3B82F6" style={styles.itemIcon} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                {!item.isDirectory && <Text style={styles.itemSub}>{formatBytes(item.size)}</Text>}
              </View>
            </TouchableOpacity>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => onItemInfo(item)} style={styles.actionBtn}>
                <Text style={{ color: '#4F46E5', fontWeight: 'bold' }}>Інфо</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onItemDelete(item)} style={styles.actionBtn}>
                <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>Видалити</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Ця папка порожня</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Plus size={28} color="#FFF" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Створити новий об'єкт</Text>

            <View style={styles.typeSelector}>
              <TouchableOpacity style={[styles.typeBtn, isFolder && styles.typeBtnActive]} onPress={() => setIsFolder(true)}>
                <Text style={isFolder ? styles.typeBtnTextActive : styles.typeBtnText}>Папка</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.typeBtn, !isFolder && styles.typeBtnActive]} onPress={() => setIsFolder(false)}>
                <Text style={!isFolder ? styles.typeBtnTextActive : styles.typeBtnText}>Файл (.txt)</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder={isFolder ? "Назва папки" : "Назва файлу (без .txt)"}
              value={itemName}
              onChangeText={setItemName}
            />

            {!isFolder && (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Початковий текст файлу..."
                value={fileContent}
                onChangeText={setFileContent}
                multiline={true}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnTextCancel}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnConfirm} onPress={handleCreate}>
                <Text style={styles.btnTextConfirm}>Створити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: { flex: 1 },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: { marginRight: 12 },
  pathText: { fontSize: 15, fontWeight: '600', color: '#374151' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemClickable: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  itemIcon: { marginRight: 14 },
  itemName: { fontSize: 16, color: '#1F2937', fontWeight: '500' },
  itemSub: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { padding: 8, marginLeft: 8 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#9CA3AF', fontSize: 15 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4F46E5',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, elevation: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  typeSelector: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#F3F4F6', borderRadius: 8, padding: 4 },
  typeBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
  typeBtnActive: { backgroundColor: '#FFF', elevation: 2 },
  typeBtnText: { color: '#6B7280', fontWeight: '600' },
  typeBtnTextActive: { color: '#4F46E5', fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 12, color: '#1F2937' },
  textArea: { height: 80, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  btnCancel: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#F3F4F6' },
  btnTextCancel: { color: '#4B5563', fontWeight: '600' },
  btnConfirm: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#4F46E5' },
  btnTextConfirm: { color: '#FFF', fontWeight: '600' },
});