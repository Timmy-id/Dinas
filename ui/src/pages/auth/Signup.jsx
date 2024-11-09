import {
  Input,
  Button,
  Box,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Field } from '../../components/ui/field';
import { toaster } from '../../components/ui/toaster';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '../../components/ui/password-input';
import { Alert } from '../../components/ui/alert';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { register, error, isLoading } = useAuthStore();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(username, email, password);
      navigate('/login');
      toaster.create({
        title: 'Registration successful',
        type: 'success',
        position: 'top-right',
      });
    } catch (error) {
      toaster.create({
        title: 'Registration not successful',
        type: 'error',
      });
      console.log(error);
    }
  };
  return (
    <Box
      position='relative'
      backgroundImage="url('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg')"
      backgroundSize='cover'
      backgroundPosition='center center'
      h='88.7vh'
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
          Welcome to Dinas
        </Heading>
        <Text textStyle='xl' mb='6' textAlign='center' size='lg'>
          Sign Up
        </Text>
        {error && <Alert mb='2' status='error' title={error} />}
        <form onSubmit={handleRegister}>
          <VStack spacing={4}>
            <Field label='Username' required errorText={error}>
              <Input
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter your username'
              />
            </Field>

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
              Register
            </Button>
            <Text align={'center'} mt='2'>
              Already have an account?{' '}
              <span style={{ color: '#F87171' }}>
                <Link to='/login'>Login</Link>
              </span>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpForm;
