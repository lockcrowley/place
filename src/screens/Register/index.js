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
  Box,
  Text,
  HStack,
  WarningOutlineIcon,
  Link,
  KeyboardAvoidingView,
  useToast
} from 'native-base';

export function Register(){
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  const toast = useToast();

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const navigateToSignIn = () => {
    navigation.navigate("SignIn")
  }

  const handleClick = () => setShow(!show);

  async function createUser () {
    await api.post('/api/auth/create', {
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
    .then(() => {
      navigateToSignIn()
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="4" py="3" rounded="sm" mb={5} mr={2}>
                   <Text color="white">Conta criada com sucesso!</Text>
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
    if(formData.name === undefined){
      setErrors({ ...errors,
        name: 'O campo nome precisa ser preenchido'
      }); 
      return false;

    }else if(formData.name.length < 3){
      setErrors({ ...errors,
        name: 'O campo nome precisa ser preenchido'
      });
      return false

    }else if(!re.test(String(formData.email).toLowerCase())) {
      setErrors({ ...errors,
        email: 'O campo email está invalido',
      });
      return false;

    }else if(formData.password === undefined) {
      setErrors({ ...errors,
        password: 'O campo senha deve conter pelo menos 8 caracteres',
      }); 
      return false;

    }else if(formData.password.length < 8){
      setErrors({ ...errors,
        password: 'O campo senha deve conter pelo menos 8 caracteres',
      }); 
      return false;
      
    }else if(formData.password != formData.passwordConfirm){
      setErrors({ ...errors,
        passwordConfirm: 'As senhas não são iguais',
      }); 
      return false;
    }

    return createUser();
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
        <Center height="full">
          <VStack width="full" p={5}> 
            <Heading color="blueGray.900" mb={10}>
              Cadastre-se
            </Heading>

            <FormControl isRequired isInvalid={'name' in errors}>
              <FormControl.Label>Nome</FormControl.Label>
              <Input 
                placeholder="Seu nome"
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
                  name: value
                })}
              />

              <FormControl.ErrorMessage 
                leftIcon={<WarningOutlineIcon/>}
              >
                {errors.name}
              </FormControl.ErrorMessage>
            </FormControl>

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
              <FormControl.Label>Repetir senha</FormControl.Label>
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
              Cadastrar
            </Button>

            <HStack mt={8}>
              <Text mr={2}>Já tem uma conta?</Text>

              <Link onPress={() => navigation.navigate("SignIn")} _text={{color: "primary.600"}}>
                Entrar
              </Link>
            </HStack>
          </VStack>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}