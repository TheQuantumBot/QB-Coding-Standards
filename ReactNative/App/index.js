import React from 'react';
import {SafeAreaView, StatusBar, View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigation from './navigation/MainNavigation';

const App = ({params}) => (
  <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent={false} backgroundColor={'white'} style="#000"  />
      <View style={{backgroundColor: 'white', flex: 1}}>
        <MainNavigation />
      </View>
    </SafeAreaView>
  </GestureHandlerRootView>
);

export default App;
