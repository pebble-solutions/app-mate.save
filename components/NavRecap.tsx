import React from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RecapDay} from '../components/RecapDay';
import { RecapWeek} from '../components/RecapWeek';
import { RecapButton } from '../components/RecapButton';
import {RecapMonth} from '../components/RecapMonth';

function RecapWeek({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>WEEK</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.navigate('Week')}
        />
      </View>
    );
  }
const Stack = createStackNavigator();

function RecapNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recap">
        <Stack.Screen name="Day" component={RecapDay} />
        <Stack.Screen name="Week" component={RecapWeek} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RecapNav;