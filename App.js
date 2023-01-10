import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native"; // как провайдер в реакте обвертка BrowserRouter
import { Provider } from "react-redux";
import { store } from "./redux/store";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import useRoute from "./router";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const routing = useRoute();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        });

        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontIsLoaded(true);
      }
    }
    prepare();
  }, []);

  if (!fontIsLoaded) {
    return null;
  }

  return (
    <Provider storeк={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
к;
