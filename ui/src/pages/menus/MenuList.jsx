import { useEffect } from 'react';
import { useMenuStore } from '../../store/menuStore';
import { Card, Grid, HStack, IconButton, Text } from '@chakra-ui/react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '../../components/ui/pagination';

const MenuList = () => {
  const { menus, fetchMenus } = useMenuStore();

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap='6' mt='4' mx='3'>
      {menus.map((menu) => (
        <Card.Root maxW='sm' overflow='hidden' key={menu.id}>
          <Card.Body>
            <Card.Title>{menu.name}</Card.Title>
            <Card.Description>{menu.description}</Card.Description>
            <Text
              textStyle='2xl'
              fontWeight='medium'
              letterSpacing='tight'
              mt='2'
            >
              {menu.price}
            </Text>
            {menu.isAvailable ? (
              <IconButton>
                <FaCheck />
              </IconButton>
            ) : (
              <IconButton>
                <FaXmark />
              </IconButton>
            )}
          </Card.Body>
        </Card.Root>
      ))}
      <PaginationRoot>
        <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Grid>
  );
};

export default MenuList;
