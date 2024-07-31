import { View, Image, Text } from "react-native";

const Card = () => {
  return (
    <View
      className="relative"
      style={{
        shadowColor: "#BFBFC0",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      }}>
      <Image
        className="rounded-xl h-[446px] w-[343px]"
        source={require("@src/assets/katten.png")}
      />
      <View className="px-4 flex items-center">
        <View className="flex w-full flex-row  justify-between absolute bottom-0 bg-white rounded-t-2xl  py-2 px-3">
          <View>
            <Text className="text-base font-bold text-[#434141]">Katten</Text>
            <Text className="text-[8px] text-[#BFBFC0]">Egypt</Text>
          </View>
          <Text className="text-[#434141] font-bold">12</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
