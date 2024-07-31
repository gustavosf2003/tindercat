import CustomTab from "@src/components/CustomTab";
import Layout from "@src/components/Layout";
import SwipeButtons from "@src/components/SwipeableComponent/SwipeButtons";
import TinderSwipeCards from "@src/components/TinderSwipeComponent";
import catsService from "@src/services/cats";
import { CatImage } from "@src/types/cat";
import { useQuery } from "@tanstack/react-query";
import { View, Text, Image } from "react-native";

export default function Home() {
  return (
    <Layout>
      <View className="flex items-center justify-center mt-5">
        <CustomTab />
        <View className="mt-5" />
        <CatComponent />

        {/* <CatComponent /> */}
      </View>
    </Layout>
  );
}

const CatComponent = () => {
  const { data, isFetching } = useQuery<CatImage[]>({
    queryKey: ["images"],
    queryFn: async () => {
      return await catsService.getCatImages(10);
    },
    initialData: [] as CatImage[],
  });

  if (isFetching) {
    return <Text>Loading...</Text>;
  }
  if (!data) {
    return <Text>No cats found</Text>;
  }
  return (
    <View className="">
      <TinderSwipeCards
        content={data.map((cat) => {
          return {
            id: cat.id,
            name: "Abyssinian",
            country: "Australia",
            imageUrl: cat.url,
          };
        })}
        onEndReached={() => {}}
        onSwipe={(status, id) => {}}
      />
    </View>
  );
};
