import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteNames } from "@src/config/constants";
import { dropShadow } from "@src/utils/styles";
import { TouchableOpacity, View } from "react-native";

import { Icon } from "../Icon";

const BottomBar = () => {
  const route = useRoute();
  const { navigate } = useNavigation();
  const items = [
    { name: RouteNames.home, IconComponent: Icon.Paw },
    { name: RouteNames.chat, IconComponent: Icon.Chat },
    { name: RouteNames.user, IconComponent: Icon.User },
  ];

  return (
    <View className="absolute flex flex-row items-center justify-center w-full bottom-4">
      <View
        className="flex-row items-center justify-center px-2 bg-white rounded-full"
        style={dropShadow}>
        {items.map((item) => (
          <TouchableOpacity
            onPress={() => navigate(item.name as never)}
            key={item.name}
            className="inline-flex items-center justify-center p-4 rounded-full">
            <item.IconComponent isActive={route.name === item.name} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomBar;
