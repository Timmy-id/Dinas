import { Container, Heading, Stack, Text } from '@chakra-ui/react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxW={'3xl'}>
      <Stack
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Dine with us <br />
          <Text as={'span'} color='red.500'>
            with various delicacies
          </Text>
        </Heading>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
        >
          <Button
            colorScheme={'green'}
            bg={'red.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'red.500',
            }}
          >
            <Link to='/register'>Get Started</Link>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
