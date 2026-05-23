import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Alert, View } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { documentDirectory, Paths } from 'expo-file-system';

import StorageStats from './components/StorageStats';
import DirectoryScreen from './screens/DirectoryScreen';
import FileEditorScreen from './screens/FileEditorScreen';
import ItemInfoScreen from './screens/ItemInfoScreen';

const ROOT_DIR = documentDirectory || Paths?.document?.uri;

export default function App() {
  const [currentDir, setCurrentDir] = useState(ROOT_DIR);
  const [dirContent, setDirContent] = useState([]);
  const [storageInfo, setStorageInfo] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  const [selectedInfoItem, setSelectedInfoItem] = useState(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  useEffect(() => {
    const initStorage = async () => {
      if (currentDir) {
        try {
          const info = await FileSystem.getInfoAsync(currentDir);
          if (!info.exists) {
            await FileSystem.makeDirectoryAsync(currentDir, { intermediates: true });
          }
          await loadDirectoryContent(currentDir);
          await loadStorageStats();
        } catch (e) {
          console.error('Initialization error:', e);
        }
      }
    };
    initStorage();
  }, [currentDir]);

  const loadDirectoryContent = async (path) => {
    try {
      const files = await FileSystem.readDirectoryAsync(path);
      const details = await Promise.all(
        files.map(async (name) => {
          const itemPath = `${path}${name}${name.includes('.') ? '' : '/'}`;
          const info = await FileSystem.getInfoAsync(itemPath);
          return {
            name,
            path: itemPath,
            isDirectory: info.isDirectory,
            size: info.size,
            modificationTime: info.modificationTime,
          };
        })
      );
      setDirContent(details);
    } catch (error) {
      console.error('Read error:', error);
      Alert.alert('Помилка', 'Не вдалося прочитати директорію');
    }
  };

  const loadStorageStats = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskStorageAsync();
      const used = total - free;
      setStorageInfo({ total, free, used });
    } catch (error) {
      console.log('Помилка статистики пам\'яті', error);
    }
  };

  const handleCreateItem = async (name, isFolder, initialText) => {
    if (!currentDir) {
      Alert.alert('Помилка', 'Поточна директорія не визначена');
      return;
    }

    const baseDir = currentDir.endsWith('/') ? currentDir : `${currentDir}/`;
    const targetPath = `${baseDir}${name}${isFolder ? '' : '.txt'}`;
    
    try {
      if (isFolder) {
        await FileSystem.makeDirectoryAsync(targetPath, { intermediates: true });
      } else {
        await FileSystem.writeAsStringAsync(targetPath, initialText || '', { 
          encoding: FileSystem.EncodingType.UTF8 
        });
      }
      loadDirectoryContent(currentDir);
      loadStorageStats();
    } catch (error) {
      console.error('Create error:', error);
      Alert.alert('Помилка', `Не вдалося створити ${isFolder ? 'папку' : 'файл'}: ${error.message}`);
    }
  };

  const handleItemPress = async (item) => {
    if (item.isDirectory) {
      setCurrentDir(item.path.endsWith('/') ? item.path : `${item.path}/`);
    } else {
      try {
        const content = await FileSystem.readAsStringAsync(item.path, { encoding: FileSystem.EncodingType.UTF8 });
        setSelectedFile(item);
        setFileContent(content);
        setIsEditorVisible(true);
      } catch (error) {
        Alert.alert('Помилка', 'Не вдалося відкрити файл');
      }
    }
  };

  const handleSaveFileChanges = async () => {
    try {
      await FileSystem.writeAsStringAsync(selectedFile.path, fileContent, { encoding: FileSystem.EncodingType.UTF8 });
      setIsEditorVisible(false);
      loadDirectoryContent(currentDir);
      Alert.alert('Успіх', 'Зміни збережено');
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зберегти зміни');
    }
  };

  const handleItemDelete = (item) => {
    Alert.alert(
      'Підтвердження видалення',
      `Ви впевнені, що хочете видалити ${item.name}?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(item.path, { idempotent: true });
              loadDirectoryContent(currentDir);
              loadStorageStats();
            } catch (error) {
              Alert.alert('Помилка', 'Не вдалося видалити об\'єкт');
            }
          },
        },
      ]
    );
  };

  const handleNavigateUp = () => {
    if (currentDir === ROOT_DIR) return;
    
    const pathWithoutTrailingSlash = currentDir.endsWith('/') ? currentDir.slice(0, -1) : currentDir;
    const lastSlashIndex = pathWithoutTrailingSlash.lastIndexOf('/');
    
    if (lastSlashIndex !== -1) {
      const parentPath = pathWithoutTrailingSlash.slice(0, lastSlashIndex + 1);
      if (parentPath.startsWith(ROOT_DIR)) {
        setCurrentDir(parentPath);
      } else {
        setCurrentDir(ROOT_DIR);
      }
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatPath = (path) => {
    if (!path) return 'root/';
    return path.replace(ROOT_DIR, 'root/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />

      {currentDir === ROOT_DIR && (
        <StorageStats stats={storageInfo} formatBytes={formatBytes} />
      )}

      <DirectoryScreen
        currentDir={currentDir}
        dirContent={dirContent}
        isRoot={currentDir === ROOT_DIR}
        onNavigateUp={handleNavigateUp}
        onItemPress={handleItemPress}
        onItemInfo={(item) => { setSelectedInfoItem(item); setIsInfoVisible(true); }}
        onItemDelete={handleItemDelete}
        onCreateItem={handleCreateItem}
        formatPath={formatPath}
        formatBytes={formatBytes}
      />

      <FileEditorScreen
        visible={isEditorVisible}
        file={selectedFile}
        content={fileContent}
        onChangeContent={setFileContent}
        onClose={() => setIsEditorVisible(false)}
        onSave={handleSaveFileChanges}
      />

      <ItemInfoScreen
        visible={isInfoVisible}
        item={selectedInfoItem}
        onClose={() => setIsInfoVisible(false)}
        formatBytes={formatBytes}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
});
