import { dropShadow } from "@src/utils/styles";
import { TouchableOpacity, View } from "react-native";

import { Icon } from "../Icon";

const CustomTab = () => {
  return (
    <View
      className="bg-[#E3E3E4] p-1 rounded-full flex flex-row items-center justify-centers"
      style={dropShadow}>
      <TouchableOpacity className="inline-flex items-center justify-center px-3 py-1 bg-white rounded-full ">
        <Icon.Tinder />
      </TouchableOpacity>
      <TouchableOpacity className="inline-flex items-center justify-center px-3 py-1 rounded-full ">
        <Icon.Star />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTab;
