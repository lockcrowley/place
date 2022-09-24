import React, {createContext, useContext, useEffect, useState} from 'react';

import { useToast, Box, Text } from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export const AuthContext = React.createContext();

function AuthProvider({children}) {
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const [data, setData] = useState({})

  const toast = useToast();

  const userStorageKey = '@place:user';

  async function signIn(email, password) {
    try{
      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      const {accessToken, user} = response.data;
      api.defaults.headers.authorization = `${accessToken}`;

      setData({...user, accessToken});

      await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));

    }catch (err) {
      toast.show({
        render: () => {
          return <Box bg="red.600" px="4" py="3" rounded="sm" mb={5} mr={2}>
                   <Text color="white">{err.response.data.error}</Text>
                 </Box>;
        },
        placement: 'top-right'
      })
    }
  }

  // useEffect(() => {
  //   async function loadStorageData(){
  //     const userStorage = await AsyncStorage.getItem(userStorageKey);

  //     if(userStorage) {
  //       const userLogged = JSON.parse(userStorage);
  //       setData(userLogged)
  //     }

  //     setUserStorageLoading(false);
  //   }

  //   loadStorageData();
  // }, [])

  return (
    <AuthContext.Provider value={{
      user: data,
      signIn,
      userStorageLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context
}

export { AuthProvider, useAuth };