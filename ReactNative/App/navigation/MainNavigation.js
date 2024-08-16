import {NavigationContainer} from '@react-navigation/native';
import {useRef} from 'react';

import { navigationRef } from './RootNavigation';
import StackNavigation from './StackNavigation';

const MainNavigation = ({params}) => {
  const routeNameRef = useRef();
  console.log(routeNameRef,"routeNameRef")
  // const navigationRef = useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        // if (previousRouteName !== currentRouteName) {
        //   await analytics().logScreenView({
        //     screen_name: currentRouteName,
        //     screen_class: currentRouteName,
        //   });
        // }
        routeNameRef.current = currentRouteName;
      }}
      theme={{
        dark: false,
        colors: {
          background: '#f5f5f5',
          border: '#ccc',
          card: '#f0f0f0',
          notification: '#f0f0f0',
          primary: "red",
          text: '#000',
        },
      }}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default MainNavigation;
