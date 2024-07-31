import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "@src/screens/Chat";
import Home from "@src/screens/Home";
import User from "@src/screens/User";

import { RouteNames } from "./constants";

const Stack = createNativeStackNavigator();

class Routes extends React.Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName={RouteNames.home}
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}>
        <Stack.Screen name={RouteNames.home} component={Home} />
        <Stack.Screen name={RouteNames.chat} component={Chat} />
        <Stack.Screen name={RouteNames.user} component={User} />
      </Stack.Navigator>
    );
  }
}
export default Routes;
