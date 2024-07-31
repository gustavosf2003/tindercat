import { View } from "react-native";

import Button from "../Button";
import { Icon } from "../Icon";

const SwipeButtons = ({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) => {
  return (
    <View className="flex flex-row">
      <Button onPress={onReject}>
        <Icon.Cross />
      </Button>
      <View className="w-12" />
      <Button onPress={onAccept}>
        <Icon.Heart />
      </Button>
    </View>
  );
};

export default SwipeButtons;
