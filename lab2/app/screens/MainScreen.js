import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';


const generateData = (startIndex, count) => {
  return Array.from({ length: count }, (_, index) => {
    const id = startIndex + index;
    return {
      id: id.toString(),
      title: `Новина №${id}`,
      description: `Це детальний опис для новини під номером ${id}. Тут міститься важливий та цікавий текст для лабораторної роботи.`,
      image: `https://picsum.photos/id/${(id % 50) + 10}/300/200`
    };
  });
};

export default function MainScreen({ navigation }) {
  const [data, setData] = useState(generateData(1, 10));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);


  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setData(generateData(1, 10));
      setIsRefreshing(false);
    }, 1500);
  }, [isRefreshing]);


  const handleLoadMore = () => {

    if (isLoadingMore || isRefreshing) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setData(prevData => {
        const lastId = prevData.length > 0 ? parseInt(prevData[prevData.length - 1].id, 10) : 0;


        const nextData = generateData(lastId + 1, 10);

        setIsLoadingMore(false);
        return [...prevData, ...nextData];
      });
    }, 1500);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { id: item.id, title: item.title, description: item.description, image: item.image })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.cardDesc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}


        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}

        ListHeaderComponent={<View style={styles.header}><Text style={styles.headerText}>Свіжі публікації</Text></View>}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#007AFF" style={{ margin: 15 }} /> : null}
        ItemSeparatorComponent={() => <View style={styles.separator} />}

        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { backgroundColor: '#fff', marginHorizontal: 15, borderRadius: 10, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardDesc: { color: '#666', fontSize: 14 },
  header: { padding: 15, backgroundColor: '#f9f9f9', alignItems: 'center' },
  headerText: { fontSize: 16, color: '#333', fontWeight: '600' },
  separator: { height: 15 },
});