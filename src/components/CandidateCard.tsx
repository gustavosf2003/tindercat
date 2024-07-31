import { Fragment, type ReactNode, useCallback } from "react";

import { Feather } from "@expo/vector-icons";
import { MARGIN_X } from "@src/config/constants";
import {
  Animated,
  Dimensions,
  type GestureResponderHandlers,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const CandidateCardAnimatedRoot: React.FC<{
  isFirst: boolean;
  swipe: Animated.ValueXY;
  tiltSign: Animated.Value;
  children?: ReactNode;
  dragHandlers: GestureResponderHandlers;
}> = ({ isFirst, swipe, tiltSign, children, dragHandlers }) => {
  // Calculate the rotation of the card based on swipe gesture
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const borderColor = swipe.x.interpolate({
    inputRange: [-100, -50, 0, 50, 100],
    outputRange: ["red", "red", "white", "green", "green"],
  });

  // Animated style for the card with rotation and translation
  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const approveOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const denyOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          className="absolute left-4 top-4"
          style={[{ opacity: approveOpacity }]}>
          <View className="p-5 rounded-full bg-green">
            <Feather name="check" size={40} color="green" />
          </View>
        </Animated.View>
        <Animated.View
          className="absolute right-4 top-4"
          style={[{ opacity: denyOpacity }]}>
          <View className="p-5 rounded-full bg-error">
            <Feather name="x" size={40} color="red" />
          </View>
        </Animated.View>
      </>
    );
  }, [approveOpacity, denyOpacity]);

  return (
    <Animated.View
      className="absolute border top-4 rounded-2xl"
      style={[
        { width: SCREEN_WIDTH - MARGIN_X },
        isFirst && animatedCardStyle,
        isFirst ? { borderColor: borderColor } : { borderColor: "black" },
      ]}
      {...dragHandlers}>
      {children}
      {isFirst && renderChoice()}
    </Animated.View>
  );
};

const CardImage: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <View className="relative ">
      <View style={{ height: (SCREEN_WIDTH - MARGIN_X) / 0.8 }}>
        {children}
      </View>
    </View>
  );
};

const CardContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <View className="absolute bottom-0 w-full">
      <View className="bottom-0 px-4 py-2 mx-4 bg-white rounded-t-xl">
        {children}
      </View>
    </View>
  );
};

export const CandidateCard = {
  AnimatedRoot: CandidateCardAnimatedRoot,
  Content: CardContent,
  Image: CardImage,
};
