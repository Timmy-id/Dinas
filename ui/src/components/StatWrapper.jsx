import { HStack, Icon, Flex } from '@chakra-ui/react';
import { StatRoot, StatLabel, StatValueText } from './ui/stat';

const StatWrapper = ({ children, label, value }) => {
  return (
    <StatRoot>
      <HStack>
        <Icon marginRight='3' fontSize='25px' color='blue.500'>
          {children}
        </Icon>
        <Flex direction='column'>
          <StatLabel>{label}</StatLabel>
          <StatValueText value={value} />
        </Flex>
      </HStack>
    </StatRoot>
  );
};

export default StatWrapper;
