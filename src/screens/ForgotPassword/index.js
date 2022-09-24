import React, {useState} from 'react';

import { Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  Center,
  Input,
  VStack,
  Heading,
  FormControl,
  Icon,
  Button,
  IconButton,
  WarningOutlineIcon,
  Box,
  KeyboardAvoidingView,
  useToast,
  Text
} from 'native-base';

export function ForgotPassword(){
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  const toast = useToast();

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  async function forgotPass () {
    await api.patch('/api/auth/forgot-password', {
      email: formData.email
    })
    .then(() => {
      navigation.navigate("ResetPassword")
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="4" py="3" rounded="sm" mb={5} mr={2}>
                   <Text color="white">E-mail enviado!</Text>
                 </Box>;
        },
        placement: 'top-right'
      })
    })
    .catch((err) => {
      toast.show({
        render: () => {
          return <Box bg="red.600" px="4" py="3" rounded="sm" mb={5} mr={2}>
                   <Text color="white">{err.response.data.error}</Text>
                 </Box>;
        },
        placement: 'top-right'
      })
    })
  }
  
  const validate = () => {
    if(!re.test(String(formData.email).toLowerCase())) {
      setErrors({...errors, 
        email: 'E-mail inválido',
      });
      return false;
    }

    return forgotPass();
  }

  const onSubmit = () => {
    !validate() 
    ? toast.show({
      render: () => {
        return <Box bg="red.600" px="4" py="3" rounded="sm" mb={5} mr={2}>
                 <Text color="white">Dados inválidos</Text>
               </Box>;
      },
      placement: 'top-right'
    })
    : validate();
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Center>
          <VStack width="full" p={5}>
            <Box alignItems="flex-start" mb={60} mt={10} right={5}>
              <IconButton onPress={() => navigation.goBack()} icon={
                <Icon
                  color="coolGray.900"
                  size={10}
                  as={<MaterialIcons name="arrow-back"/>}
                />}
              />
            </Box>
            
            <Heading color="blueGray.900" mb={10}>
              Solicitar troca de senha
            </Heading>

            <FormControl isRequired isInvalid={'email' in errors}>
              <FormControl.Label>E-mail</FormControl.Label>
              <Input 
                keyboardType='email-address'
                placeholder="seu@email.com"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml={2}
                    color="blueGray.900"
                  />
                }
                mb={2}
                onChangeText={value => setFormData({...formData,
                  email: value
                })}
              />

              <FormControl.ErrorMessage 
                leftIcon={<WarningOutlineIcon/>}
              >
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button onPress={onSubmit} mt={5}>
              Enviar
            </Button>
        
          </VStack>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}