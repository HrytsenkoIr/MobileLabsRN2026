import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { AppContext } from '../context/AppContext';

export default function ClickerScreen() {
  const { score, addPoints, updateChallenge, theme } = useContext(AppContext);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      runOnJS(addPoints)(1);
      runOnJS(updateChallenge)(1);
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(addPoints)(2);
      runOnJS(updateChallenge)(2);
    });

  const tripleTap = Gesture.Tap()
    .numberOfTaps(3)
    .onStart(() => {
      runOnJS(addPoints)(3);
      runOnJS(updateChallenge)(9);
    });

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onStart(() => {
      runOnJS(addPoints)(5);
      runOnJS(updateChallenge)(3);
    });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
      runOnJS(updateChallenge)(4);
    });

  const swipeRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      runOnJS(addPoints)(Math.floor(Math.random() * 10) + 1);
      runOnJS(updateChallenge)(5);
    });

  const swipeLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      runOnJS(addPoints)(Math.floor(Math.random() * 10) + 1);
      runOnJS(updateChallenge)(6);
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      runOnJS(updateChallenge)(7);
    });

  const composedGestures = Gesture.Exclusive(tripleTap, doubleTap, singleTap);
  const combinedGestures = Gesture.Simultaneous(composedGestures, longPress, pan, swipeRight, swipeLeft, pinch);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ]
  }));

  const isLight = theme === 'light';

  return (
    <View style={[styles.container, { backgroundColor: isLight ? '#f5f5f5' : '#121212' }]}>
      <View style={[styles.scoreBox, { backgroundColor: isLight ? '#fff' : '#1e1e1e' }]}>
        <Text style={[styles.scoreTitle, { color: isLight ? '#777' : '#aaa' }]}>SCORE</Text>
        <Text style={[styles.scoreText, { color: isLight ? '#007AFF' : '#0a84ff' }]}>{score}</Text>
      </View>

      <View style={styles.interactiveArea}>
        <GestureDetector gesture={combinedGestures}>
          <Animated.View style={[styles.target, animatedStyle]}>
            <Text style={styles.targetText}>CLICK ME</Text>
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={[styles.infoBox, { backgroundColor: isLight ? '#fff' : '#1e1e1e' }]}>
        <Text style={{ color: isLight ? '#333' : '#fff' }}>☝️ Tap: +1 point</Text>
        <Text style={{ color: isLight ? '#333' : '#fff' }}>✌️ Double Tap: +2 points</Text>
        <Text style={{ color: isLight ? '#333' : '#fff' }}>⏱️ Long Press 3s: +5 points</Text>
        <Text style={{ color: isLight ? '#333' : '#fff' }}>↔️ Swipe Left/Right: Random points</Text>
        <Text style={{ color: isLight ? '#333' : '#fff' }}>🤏 Pinch: Resize object</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scoreBox: { padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 20, elevation: 2 },
  scoreTitle: { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  scoreText: { fontSize: 42, fontWeight: 'bold' },
  interactiveArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  target: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center', elevation: 5 },
  targetText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  infoBox: { padding: 15, borderRadius: 12, gap: 5, elevation: 2 }
});