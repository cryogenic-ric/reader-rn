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

export const contentTagStyles = {
  p: { fontSize: 18, lineHeight: 30, padding: 5, paddingHorizontal: 25 },
  blockquote: {
    fontSize: 18,
    lineHeight: 30,
    padding: 5,
    paddingHorizontal: 25,
  },
  h1: { fontSize: 18, lineHeight: 30, padding: 5, paddingHorizontal: 25 },
  h2: { fontSize: 18, lineHeight: 30, padding: 5, paddingHorizontal: 25 },
  h3: { fontSize: 18, lineHeight: 30, padding: 5, paddingHorizontal: 25 },
  h4: { fontSize: 18, lineHeight: 30, padding: 5, paddingHorizontal: 25 },
  h5: { fontSize: 18, lineHeight: 30, padding: 5, paddingHorizontal: 25 },
  h6: { fontSize: 18, lineHeight: 30, padding: 5, paddingHorizontal: 25 },
  br: { fontSize: 18, lineHeight: 30, padding: 5, paddingHorizontal: 25 },
  img: { marginVertical: 10, height: "auto" },
};
