import CustomTab from "@src/components/CustomTab";
import Layout from "@src/components/Layout";
import TinderSwipeCards from "@src/components/TinderSwipeComponent";
import catsService from "@src/services/cats";
import { CatImage, SwipeActions } from "@src/types/cat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <Layout>
      <View className="flex items-center justify-center mt-5">
        <CustomTab />
        <View className="mt-5" />
        <CatComponent />
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

  const mutation = useMutation({
    mutationFn: async ({ id, vote }: { id: string; vote: number }) =>
      await catsService.reviewCat(id, vote),
  });

  const onSwipe = (status: SwipeActions, id: string) => {
    if (status === "accept") {
      mutation.mutate({ id, vote: 1 });
    } else {
      mutation.mutate({ id, vote: -1 });
    }
  };

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
        onEndReached={() => {
          console.log("hey");
        }}
        onSwipe={onSwipe}
      />
    </View>
  );
};
