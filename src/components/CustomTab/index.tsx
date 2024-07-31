import { dropShadow } from "@src/utils/styles";
import { TouchableOpacity, View } from "react-native";

import { Icon } from "../Icon";

const CustomTab = () => {
  return (
    <View
      className="bg-[#E3E3E4] p-1 rounded-full flex flex-row items-center justify-centers"
      style={dropShadow}>
      <TouchableOpacity className="bg-white rounded-full justify-center inline-flex  px-3 py-1  items-center">
        <Icon.Tinder />
      </TouchableOpacity>
      <TouchableOpacity className=" rounded-full justify-center inline-flex  px-3 py-1  items-center">
        <Icon.Star />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTab;
