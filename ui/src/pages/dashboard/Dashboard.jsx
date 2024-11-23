import { Box, Flex } from '@chakra-ui/react';
import DashboardStat from '../../components/DashboardStat';

const Dashboard = () => {
  return (
    <Box>
      <Flex gap='4'>
        <DashboardStat />
      </Flex>
    </Box>
  );
};

export default Dashboard;
