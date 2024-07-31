import catsService from "@src/services/cats";
import { SwipeActions } from "@src/types/cat";
import { useMutation } from "@tanstack/react-query";

type UseCatReviewReturn = {
  onSwipe: (status: SwipeActions, id: string) => void;
  isLoading: boolean;
  error: Error | null;
};

const useCatReview = (): UseCatReviewReturn => {
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

  return {
    onSwipe,
    isLoading: mutation.isLoading,
    error: mutation.error as Error,
  };
};

export default useCatReview;
