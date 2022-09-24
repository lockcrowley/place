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
  useToast
} from 'native-base';

export function ResetPassword(){
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const navigation = useNavigation();

  const toast = useToast();

  const handleClick = () => setShow(!show);

  const navigateToSignIn = () => {
    navigation.navigate("SignIn")
  }

  async function resetPass () {
    await api.patch('/api/auth/reset-password', {
      resetToken: formData.resetToken,
      password: formData.password
    })
    .then(() => {
      navigateToSignIn();
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="4" py="3" rounded="sm" mb={5} mr={2}>
                   <Text color="white">Senha resetada com sucesso!</Text>
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
    if(formData.resetToken === undefined){
      setErrors({...errors, 
        resetToken: 'Token inválido',
      });
      return false;

    }else if(formData.password === undefined) {
      setErrors({...errors, 
        password: 'O campo senha deve conter pelo menos 8 caracteres',
      });
      return false;

    } else if (formData.password.length < 8) {
      setErrors({ ...errors,
        password: 'O campo senha deve conter pelo menos 8 caracteres',
      });
      return false;

    } else if(formData.password != formData.passwordConfirm){
      setErrors({ ...errors,
        passwordConfirm: 'As senhas não são iguais',
      });
      return false;
    }

    return resetPass();
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
              Resetar senha
            </Heading>

            <FormControl isRequired isInvalid={'resetToken' in errors}>
            <FormControl.Label>Token</FormControl.Label>
              <Input 
                placeholder="Token"

                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml={2}
                    color="blueGray.900"
                  />
                }
                onChangeText={value => setFormData({...formData,
                  resetToken: value
                })}
              />
              <FormControl.ErrorMessage 
                leftIcon={<WarningOutlineIcon/>}
              >
                {errors.resetToken}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label>Senha</FormControl.Label>
              <Input 
                placeholder="Senha"
                type={show ? "text" : "password"}
                InputRightElement={
                  <Icon
                    as={<MaterialIcons name={show ? "visibility" : "visibility-off"}/>}
                    mr={2}
                    size={5}
                    color="muted.400"
                    onPress={handleClick}
                  />
                }
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml={2}
                    color="blueGray.900"
                  />
                }
                onChangeText={value => setFormData({...formData,
                  password: value
                })}
              />
              <FormControl.HelperText>A senha deve conter no mínimo 8 caracteres</FormControl.HelperText>

              <FormControl.ErrorMessage 
                leftIcon={<WarningOutlineIcon/>}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={'passwordConfirm' in errors}>
              <FormControl.Label mt={5}>Repetir senha</FormControl.Label>
              <Input 
                placeholder="Repetir senha"
                type={show ? "text" : "password"}
                InputRightElement={
                  <Icon
                    as={<MaterialIcons name={show ? "visibility" : "visibility-off"}/>}
                    mr={2}
                    size={5}
                    color="muted.400"
                    onPress={handleClick}
                  />
                }
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml={2}
                    color="blueGray.900"
                  />
                }
                onChangeText={value => setFormData({...formData,
                  passwordConfirm: value
                })}
              />

              <FormControl.ErrorMessage 
                leftIcon={<WarningOutlineIcon/>}
              >
                {errors.passwordConfirm}
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