export default {
  expo: {
    name: "Gamma Labs",
    slug: "gamma-labs",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/gamma.jpg",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/gamma.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.gammalabs"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/gamma.jpg",
        backgroundColor: "#FFFFFF"
      },
      package: "com.yourcompany.gammalabs"
    },
    web: {
      favicon: "./assets/images/gamma.jpg"
    },
    extra: {
      eas: {
        projectId: "your-project-id-here"
      }
    },
    plugins: [
      [
        "expo-build-properties",
        {
          ios: {
            deploymentTarget: "13.0"
          },
          android: {
            compileSdkVersion: 33,
            targetSdkVersion: 33,
            buildToolsVersion: "33.0.0"
          }
        }
      ]
    ]
  }
};