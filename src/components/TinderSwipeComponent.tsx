import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Image } from "expo-image";
import { Animated, Dimensions, PanResponder, Text, View } from "react-native";

import { CandidateCard } from "./CandidateCard";
import SwipeButtons from "./SwipeableComponent/SwipeButtons";

type CandidateCardProps = {
  name: string;
  country: string;
  imageUrl: string | null;
  id: string;
};

type SwipeableCardProps = {
  content: CandidateCardProps[];
  onSwipe: (status: "accept" | "reject", id: string) => void;
  onEndReached: () => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const TinderSwipeCards: React.FC<SwipeableCardProps> = ({
  content,
  onSwipe,
  onEndReached,
}) => {
  const [cards, setCards] = useState<CandidateCardProps[]>(content);

  // animated values for swipe and tilt
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!cards.length) {
      onEndReached();
    }
  }, [cards.length]);

  const panResponder = PanResponder.create({
    // allow pan responder to activate, set limits to be able to press buttons within cards
    onMoveShouldSetPanResponder: (_, gestureState) => {
      const { dx, dy } = gestureState;
      return dx > 2 || dx < -2 || dy > 2 || dy < -2;
    },

    // handle card movement while dragging
    onPanResponderMove: (_, { dx, y0 }) => {
      swipe.setValue({ x: dx, y: 0 });
      tiltSign.setValue(y0 > (SCREEN_HEIGHT * 0.9) / 2 ? 1 : -1);
    },

    // handle card release after dragging
    onPanResponderRelease: (_, { dx }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        // swipe the card off the screen
        onSwipe(direction === 1 ? "accept" : "reject", cards[0].id);
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: 0,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        // return the card to its original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  // remove the top card from the users array
  const removeTopCard = () => {
    setCards((prevState) => prevState.filter((_, index) => index !== 0));
    swipe.setValue({ x: 0, y: 0 });
  };

  // handle user choice (left or right swipe)
  const handleChoice = useCallback(
    (direction: number) => {
      onSwipe(direction === 1 ? "accept" : "reject", cards[0].id);
      Animated.timing(swipe.x, {
        toValue: direction * 500,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [cards, onSwipe, swipe.x]
  );

  if (cards.length === 0) {
    return <Text className="text-lg text-red-400">asdasd</Text>;
  }

  return (
    <>
      <View className=" items-center bg-black">
        {cards
          .map((candidate, index) => {
            const { id, name, imageUrl } = candidate;

            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <CandidateCard.AnimatedRoot
                key={id}
                isFirst={isFirst}
                swipe={swipe}
                tiltSign={tiltSign}
                dragHandlers={dragHandlers}>
                <CandidateCard.Image>
                  <Image
                    source={{ uri: imageUrl }}
                    contentFit="cover"
                    className="rounded-t-2xl w-full h-full"
                    cachePolicy="memory-disk"
                  />
                </CandidateCard.Image>
                <CandidateCard.Content>
                  <View>
                    <View
                      className="flex flex-row justify-between items-center"
                      style={{ gap: 4 }}>
                      <Text className="text-white text-2xl font-headline-medium">
                        {name}
                      </Text>
                    </View>
                  </View>
                </CandidateCard.Content>
              </CandidateCard.AnimatedRoot>
            );
          })
          .reverse()}
        <View className=" absolute" style={{ gap: 64 }}>
          <SwipeButtons
            onAccept={() => handleChoice(1)}
            onReject={() => handleChoice(-1)}
          />
        </View>
      </View>
    </>
  );
};

export default TinderSwipeCards;
