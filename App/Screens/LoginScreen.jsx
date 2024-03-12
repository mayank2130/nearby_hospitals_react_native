import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { defaultStyles } from "../../constants/Styles";
import { FontAwesome5 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const loginUser = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth Error:", err);
    }
  };

  return (
    <>
      <View style={{ alignItems: "center", marginTop: 120 }}>
        <Text style={{ fontSize: 25 }}> Find Hospitals Near You</Text>
      </View>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageStyle}
          source={require("../../assets/hospital.png")}
          resizeMode="cover"
        />
        <View>
          <TouchableOpacity
            onPress={() => loginUser()}
            style={styles.btnOutline}
          >
            <FontAwesome5
              name="google"
              size={24}
              style={defaultStyles.btnIcon}
            />
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 26,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 50,
  },
  imageStyle: {
    height: 120,
    width: 120,
  },
  btnOutline: {
    backgroundColor: "#007FFF",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    height: 50,
    width: 280,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#ffffff",
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
});
