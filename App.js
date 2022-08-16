import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { store } from './store';
import { ContextApiProvider } from './src/context/ContextApi';
import PolyfillCrypto from 'react-native-webview-crypto';
import { MenuProvider } from 'react-native-popup-menu';
import Router from './src/navigation/Router';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PolyfillCrypto />
      <Provider store={store}>
        <ContextApiProvider>
          <MenuProvider>
            <Router />
          </MenuProvider>
        </ContextApiProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
