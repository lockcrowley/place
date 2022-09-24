import React from "react";

import { NativeBaseProvider } from "native-base";
import * as SplachScreen from 'expo-splash-screen';
import { StatusBar } from "native-base";

import { Routes } from "./src/routes";
import { AppProvider } from "./src/hooks";
import { useAuth } from "./src/hooks/auth";

// import NativeBaseIcon from "./components/NativeBaseIcon";

// Define the config
// const config = {
//   useSystemColorMode: false,
//   initialColorMode: "dark",
// };

// extend the theme
// export const theme = extendTheme({ config });

export default function App() {
  SplachScreen.preventAutoHideAsync()
  SplachScreen.hideAsync();
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content"/>
        <AppProvider>
          <Routes/>
        </AppProvider>
      </NativeBaseProvider>
  );
}

// Color Switch Component
// function ToggleDarkMode() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <HStack space={2} alignItems="center">
//       <Text>Dark</Text>
//       <Switch
//         isChecked={colorMode === "light"}
//         onToggle={toggleColorMode}
//         aria-label={
//           colorMode === "light" ? "switch to dark mode" : "switch to light mode"
//         }
//       />
//       <Text>Light</Text>
//     </HStack>
//   );
// }
