import React from "react";
import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box
    as="nav"
    backgroundImage="url('https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg')"
    color="pink.500"
    px={4} py={2} > 
    <Flex alignItems="center" justifyContent="space-between">
      <Link as={RouterLink} to="/" data-testid="home-page" fontSize="xl" fontWeight="bold">
        Student Portal
      </Link>
      <Box>
        <Button as={RouterLink} to="/student" data-testid="student-page" colorScheme='white'variant='ghost' mr={2}>
          Student
        </Button>
        <Button as={RouterLink} to="/add" data-testid="add-page"  colorScheme='white'variant='ghost' mr={2}>
          Add Student         
        </Button>
      </Box>
    </Flex>
  </Box>
  );
};

export default NavBar;