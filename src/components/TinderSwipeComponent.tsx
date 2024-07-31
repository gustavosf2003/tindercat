import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { MARGIN_X } from "@src/config/constants";
import { SwipeActions } from "@src/types/cat";
import { Image } from "expo-image";
import { Animated, Dimensions, PanResponder, Text, View } from "react-native";

import { CatCard } from "./CatCard";
import SwipeButtons from "./SwipeableComponent/SwipeButtons";

type CatCardProps = {
  name: string;
  country: string;
  imageUrl: string | null;
  id: string;
};

type SwipeableCardProps = {
  content: CatCardProps[];
  onSwipe: (status: SwipeActions, id: string) => void;
  onEndReached: () => void;
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");

const TinderSwipeCards: React.FC<SwipeableCardProps> = ({
  content,
  onSwipe,
  onEndReached,
}) => {
  const [cards, setCards] = useState<CatCardProps[]>(content);

  // animated values for swipe and tilt
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!cards.length) {
      onEndReached();
    }
  }, [cards.length, onEndReached]);

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
    //---> not a good practice
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cards, onSwipe, swipe.x]
  );

  if (cards.length === 0) {
    return <Text className="mt-20 text-lg">That's All!!</Text>;
  }

  return (
    <>
      <View className="items-center">
        {cards
          .map((cat, index) => {
            const { id, imageUrl, country, name } = cat;

            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <CatCard.AnimatedRoot
                key={id}
                isFirst={isFirst}
                swipe={swipe}
                tiltSign={tiltSign}
                dragHandlers={dragHandlers}>
                <CatCard.Image>
                  <Image
                    source={{ uri: imageUrl }}
                    contentFit="cover"
                    className="w-full h-full rounded-2xl"
                    cachePolicy="memory-disk"
                  />
                </CatCard.Image>
                <CatCard.Content>
                  <View>
                    <View
                      className="flex flex-row items-center justify-between "
                      style={{ gap: 4 }}>
                      <Text className="text-xl font-bold text-[#434141]">
                        {name}
                      </Text>
                      <Text className="text-xl font-bold text-[#434141]">
                        8
                      </Text>
                    </View>
                    <Text className="text-sm font-medium text-[#BFBFC0]">
                      {country}
                    </Text>
                  </View>
                </CatCard.Content>
              </CatCard.AnimatedRoot>
            );
          })
          .reverse()}
        <View
          className="bottom-0"
          style={{ gap: 64, marginTop: (SCREEN_WIDTH - MARGIN_X) / 0.8 + 64 }}>
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
