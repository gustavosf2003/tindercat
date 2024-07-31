import type React from "react";
import { Fragment, useCallback } from "react";

import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  type PanGesture,
  type TapGesture,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import SwipeButtons from "./SwipeButtons";

const SWIPE_DISTANCE_TO_ACTION_DENY = 125;
const SWIPE_DISTANCE_TO_ACTION_ACCEPT = 125;

type SwipeableCardProps = {
  children: React.ReactNode;
  onPress?: () => void;
};

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onPress,
}) => {
  const position = useSharedValue(0);

  const gestures = () => {
    const gestures: (TapGesture | PanGesture)[] = [];

    if (onPress) {
      const press = Gesture.Tap().onStart(onPress).maxDistance(10);

      gestures.push(press);
    }

    const pan = Gesture.Pan()
      .activeOffsetY(10)
      .activeOffsetX(2)
      .onUpdate((update) => {
        position.value = withTiming(update.translationX, { duration: 0 });
      })
      .onEnd((end) => {
        const direction = Math.sign(end.translationX);
        const isActionActive = direction
          ? Math.abs(end.translationX) > SWIPE_DISTANCE_TO_ACTION_DENY
          : Math.abs(end.translationX) > SWIPE_DISTANCE_TO_ACTION_ACCEPT;
        if (isActionActive) {
          position.value = withTiming(direction * 500, { duration: 200 });
        } else {
          position.value = withTiming(0, { duration: 100 });
        }
      });

    gestures.push(pan);

    return gestures;
  };

  const composed = Gesture.Simultaneous(...gestures());

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    borderColor: interpolateColor(
      position.value,
      [SWIPE_DISTANCE_TO_ACTION_DENY * -1, 0, SWIPE_DISTANCE_TO_ACTION_ACCEPT],
      ["#f44336", "transparent", "#4caf50"]
    ),
  }));

  const approvedOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      position.value,
      [0, SWIPE_DISTANCE_TO_ACTION_ACCEPT],
      [0, 1]
    ),
  }));
  const deniedOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      position.value,
      [SWIPE_DISTANCE_TO_ACTION_DENY * -1, 0],
      [1, 0]
    ),
  }));

  const renderChoice = useCallback(() => {
    return (
      <Fragment>
        <Animated.View
          className="absolute top-6 -left-6"
          style={[{ ...approvedOpacity }]}>
          <View className="p-3 bg-green rounded-full">
            <Feather name="check" size={24} color="black" />
          </View>
        </Animated.View>
        <Animated.View
          className="absolute top-6 -right-6"
          style={[{ ...deniedOpacity }]}>
          <View className="p-3 bg-error rounded-full">
            <Feather name="x" size={24} color="black" />
          </View>
        </Animated.View>
      </Fragment>
    );
  }, [deniedOpacity, approvedOpacity]);

  const handleAccept = () => {
    position.value = withTiming(500, { duration: 200 });
  };

  const handleDeny = () => {
    position.value = withTiming(-500, { duration: 200 });
  };

  return (
    <>
      <GestureDetector gesture={composed}>
        <Animated.View
          className="border relative rounded-xl my-2.5 "
          style={[animatedStyle]}>
          {children}
          {renderChoice()}
        </Animated.View>
      </GestureDetector>
      <View className="w-fulll flex items-center mt-8">
        <SwipeButtons onAccept={handleAccept} onReject={handleDeny} />
      </View>
    </>
  );
};
