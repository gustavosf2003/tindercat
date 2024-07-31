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
    <View className="absolute bottom-4 flex flex-row w-full justify-center items-center">
      <View
        className="bg-white rounded-full flex-row items-center justify-center px-2"
        style={dropShadow}>
        {items.map((item) => (
          <TouchableOpacity
            onPress={() => navigate(item.name as never)}
            key={item.name}
            className="rounded-full justify-center inline-flex p-4 items-center">
            <item.IconComponent isActive={route.name === item.name} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomBar;
