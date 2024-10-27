import {
  Input,
  Button,
  Box,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Field } from '../../../components/ui/field';
import { toaster } from '../../../components/ui/toaster';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '../../../components/ui/password-input';
import { useAuthStore } from '../../../store/authStore';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/dashboard');
      toaster.create({
        title: 'Login successful',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      position='relative'
      minHeight='100vh'
      backgroundImage="url('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg')"
      backgroundSize='cover'
      backgroundPosition='center'
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'blackAlpha.700',
      }}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        position='relative'
        maxW='lg'
        w='full'
        bg='whiteAlpha.900'
        py={10}
        px={8}
        borderRadius='lg'
        boxShadow='lg'
        zIndex='1'
      >
        <Heading mb='6' textAlign='center' size='lg'>
          Welcome Back to Dinas
        </Heading>
        <Text textStyle='xl' mb='6' textAlign='center' size='lg'>
          Sign In
        </Text>
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <Field label='Email' required errorText={error}>
              <Input
                name='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
              />
            </Field>

            <Field label='Password' required errorText={error}>
              <PasswordInput
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='********'
              />
            </Field>

            <Button
              type='submit'
              colorScheme='teal'
              width='full'
              isLoading={isLoading}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignInForm;
