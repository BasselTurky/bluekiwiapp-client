import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "../../../../utils/scaling";

export default function HeaderBar({
  props,
  headerOpacity,
  headerTranslate,
  container_height,
  setNavigationIndex,
}) {
  const insets = useSafeAreaInsets();
  const inputRange = props.navigationState.routes.map((x, i) => i);
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: container_height,
        top: 0,
        transform: [{ translateY: headerTranslate }],
        opacity: headerOpacity,
        flexDirection: "row",
        paddingTop: insets.top,
      }}
    >
      {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex) =>
            inputIndex === i ? 1 : 0.5
          ),
        });

        return (
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              setNavigationIndex(i);
            }}
          >
            <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: z(16),
  },
});
