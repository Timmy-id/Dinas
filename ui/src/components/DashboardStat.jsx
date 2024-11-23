import { Flex } from '@chakra-ui/react';
import { FaBellConcierge } from 'react-icons/fa6';
import BoxWrapper from './BoxWrapper';
import StatWrapper from './StatWrapper';

const DashboardStat = () => {
  return (
    <Flex gap='4' p='3'>
      <BoxWrapper>
        <StatWrapper label='Total Menus' value='15'>
          <FaBellConcierge />
        </StatWrapper>
      </BoxWrapper>
      <BoxWrapper>
        <StatWrapper label='Total Tables' value='5'></StatWrapper>
      </BoxWrapper>
      <BoxWrapper>Stat 3</BoxWrapper>
      <BoxWrapper>Stat 4</BoxWrapper>
    </Flex>
  );
};

export default DashboardStat;
