import React, { useRef, useCallback, useMemo, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import BottomSheetContent from "./BottomSheetContent";
import { useBottomSheetBackHandler } from "@/hooks/useBottomSheetBackHandler";

interface CustomiseProps {
  onClose: () => void;
}

const Customise: React.FC<CustomiseProps> = ({ onClose }) => {
  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { handleSheetPositionChange } =
    useBottomSheetBackHandler(bottomSheetModalRef);

  const handleSheetChanges = useCallback(
    (index: number, position: number, type: any) => {
      console.log("handleSheetChanges", index);
      if (index === -1) {
        onClose();
      }
      handleSheetPositionChange(index, position, type);
    },
    []
  );

  const sheetStyle = useMemo(
    () => ({
      ...styles.sheetContainer,
      ...styles.sheetContainerShadow,
      shadowColor: "#000",
    }),
    []
  );

  const showSheet = useCallback(() => {
    bottomSheetModalRef.current?.expand();
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheet
        style={sheetStyle}
        enableDynamicSizing={true}
        overDragResistanceFactor={2.5}
        enablePanDownToClose={true}
        containerStyle={styles.modal}
        animateOnMount={true}
        ref={bottomSheetModalRef}
        index={0}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: theme.colors.elevation.level3 }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetContent></BottomSheetContent>
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  modal: { zIndex: 110 },

  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  sheetContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  sheetContainerShadow: Platform.select({
    ios: {
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.75,
      shadowRadius: 16.0,
      shadowColor: "#000",
    },
    android: {
      elevation: 24,
    },
    web: {
      boxShadow: "0px -4px 16px rgba(0,0,0, 0.25)",
    },
  }) as any,
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  fontSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#4A4A4A",
  },
  largeLabel: {
    fontSize: 24,
  },
  slider: {
    flex: 1,
    height: 2,
    backgroundColor: "#4A4A4A",
    marginHorizontal: 16,
  },
  fontStyleOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  fontOption: {
    alignItems: "center",
  },
  fontOptionText: {
    textAlign: "center",
    color: "#4A4A4A",
  },
  toggleCommentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleCommentsText: {
    marginLeft: 8,
    color: "#4A4A4A",
  },
});

export default Customise;
