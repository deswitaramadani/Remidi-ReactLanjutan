import {Link} from 'react-router-dom'
import Footer from '../components/Footer';
import { Button, Flex, Text, Box } from '@chakra-ui/react'

const Home = () => {
    return (
        <>
            <Flex 
            minHeight="100vh" 
            flexDirection="column"
            backgroundImage="url('https://i.pinimg.com/564x/78/2b/97/782b9772780630d005022edc4a229e45.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
            >
                <Flex
                flex="1"
                alignItems="center"
                justifyContent="center"
                >
                <Flex direction="column" alignItems="center">
                    <Text color="white" fontWeight="bold" fontSize="2rem" marginBottom="1rem">
                    Student Portal
                    </Text>
                    <Link data-testid="student-btn" to="/student">
                    <Button colorScheme="purple" size="lg">
                        All Students
                    </Button>
                    </Link>
                </Flex>
                </Flex>
                <Box py={3}>
                <Flex justifyContent="center">
                    <Box marginTop={-10}>
                        <Footer/>
                    </Box>
                </Flex>
                </Box>
            </Flex>
        </>
    )
};

export default Home;