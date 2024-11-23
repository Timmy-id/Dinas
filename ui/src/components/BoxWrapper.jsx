import { Flex } from '@chakra-ui/react';

const BoxWrapper = ({ children }) => {
  return (
    <Flex
      bg='white'
      rounded='sm'
      p='6'
      order='1'
      align='center'
    >
      {children}
    </Flex>
  );
};

export default BoxWrapper;
