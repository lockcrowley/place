import React, {useState} from 'react';

import { Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { 
  Box,
  Center,
  Input,
  VStack,
  Heading,
  FormControl,
  Icon,
  Button,
  Checkbox,
  Text,
  HStack,
  WarningOutlineIcon,
  Link,
  KeyboardAvoidingView,
} from 'native-base';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const navigation = useNavigation();

  const {signIn} = useAuth();

  const validate = () => {
    if(email.length < 1|| password.length < 1) {
      setErrors({...errors, 
        data: 'Campos obrigatórios',
      });
      return false;
    }

    return signIn(email, password);
  }

  const onSubmit = () => {
    validate() ? () => navigation.navigate("Home") : console.log('nooo Submitted');
  }

  const handleClick = () => setShow(!show);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Center height="full">
          <VStack width="full" p={5}>
            <Box>
              <Heading color="blueGray.900" mb={10}>
                Entrar
              </Heading>

              <FormControl isInvalid={'data' in errors}>
                <FormControl.Label>E-mail</FormControl.Label>
                <Input 
                  keyboardType="email-address"
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
                  onChangeText={setEmail}
                  value={email}
                />

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
                  onChangeText={setPassword}
                  value={password}
                />

                <FormControl.ErrorMessage 
                  leftIcon={<WarningOutlineIcon/>}
                >
                  {errors.data}
                </FormControl.ErrorMessage>
              </FormControl>

              <Link onPress={() => navigation.navigate("ForgotPassword")}
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "primary.600"
                }} alignSelf="flex-start" mt="1">
                  Esqueceu a senha?
                </Link>

              <HStack mt={5}>
                <Checkbox value="agree" accessibilityLabel="connect" mt={0.5}/>

                <Text ml={3}>
                  Mantenha-me Conectado
                </Text>
              </HStack>

                <Button onPress={onSubmit} mt={5}>
                  Entrar
                </Button>

              <HStack mt={8}>
                <Text mr={2}>Não tem conta?</Text>

                <Link onPress={() => navigation.navigate("Register")} _text={{color: "primary.600"}}>
                  Cadastre-se
                </Link>
              </HStack>
            </Box>
          </VStack>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}