/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ThreadScreen from './screens/ThreadScreen';

export default StackNavigator(

    // schermpjes
    {
        Home: {
            screen: HomeScreen
        },
        Thread: {
            screen: ThreadScreen
        }

    },

    // opties
    { 
        headerMode: 'none',
        initialRouteName: 'Home',
        transitionConfig: () => ({
             transitionSpec: {
               duration: 300,
               easing: Easing.out(Easing.poly(4)),
               timing: Animated.timing,
             },
             screenInterpolator: sceneProps => {
               const { layout, position, scene } = sceneProps;
               const { index } = scene;

               const height = layout.initHeight;
               const translateX = position.interpolate({
                 inputRange: [index - 1, index, index + 1],
                 outputRange: [height, 0, 0],
               });

               const opacity = position.interpolate({
                 inputRange: [index - 1, index - 0.99, index],
                 outputRange: [0, 1, 1],
               });

               return { opacity, transform: [{ translateX }] };
             },
           }),
    }

);

