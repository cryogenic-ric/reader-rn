import { Share } from "react-native";
import * as Haptics from "expo-haptics";

export const nativeShare = async (permalink: string) => {
  try {
    const result = await Share.share({
      message: `Check out this story: ${permalink}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        await addHaptic();
        console.log(`shared with ${result.activityType}`);
      } else {
        console.log(`shared`);
      }
    } else if (result.action === Share.dismissedAction) {
      console.log(`Share dismissed`);
    }
  } catch (error) {
    alert(error);
  }
};

export const addHaptic = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};
