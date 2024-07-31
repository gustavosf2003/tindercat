import clsx from "clsx";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomBar from "../BottomBar";

interface LayoutProps {
  children: React.ReactNode;
  customClassName?: string;
}

export default function Layout({ children, customClassName }: LayoutProps) {
  return (
    <SafeAreaView className="bg-white">
      <View className={clsx("h-full relative bg-white", customClassName)}>
        {children}
        <BottomBar />
      </View>
    </SafeAreaView>
  );
}
