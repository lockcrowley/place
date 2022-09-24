import  React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import {Register} from '../screens/Register';
import {ForgotPassword} from '../screens/ForgotPassword';
import { ResetPassword } from '../screens/ResetPassword';

const {Navigator, Screen} = createNativeStackNavigator();

export function AuthRoutes () {
  return (
    <Navigator 
      screenOptions={{
        headerShown:false
      }}
    >
      <Screen
        name="SignIn"
        component={SignIn}
      />

      <Screen
        name="Register"
        component={Register}
      />

      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />

      <Screen
        name="ResetPassword"
        component={ResetPassword}
      />

    </Navigator>
  );
}

