import React from 'react';
import { View, Text, SectionList, StyleSheet, StatusBar } from 'react-native';

const CONTACTS_DATA = [
  {
    title: 'Факультет ФІКТ',
    data: ['Тетяна НІКІТЧУК', 'Інна СУГОНЯК', 'Тетяна ВАКАЛЮК']
  },
  {
    title: 'Адміністрація',
    data: ['Деканат ФІКТ', 'Приймальна комісія', 'Студмістечко']
  },
  {
    title: 'Технічна підтримка',
    data: ['Адміністратор мережі', 'Електронний університет']
  }
];

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <SectionList
        sections={CONTACTS_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  sectionHeader: { backgroundColor: '#f2f2f7', paddingVertical: 8, paddingHorizontal: 15 },
  sectionHeaderText: { fontSize: 14, fontWeight: 'bold', color: '#8e8e93', textTransform: 'uppercase' },
  itemRow: { padding: 15, backgroundColor: '#fff' },
  itemText: { fontSize: 16, color: '#333' },
  separator: { height: 1, backgroundColor: '#e5e5ea', marginLeft: 15 },
});