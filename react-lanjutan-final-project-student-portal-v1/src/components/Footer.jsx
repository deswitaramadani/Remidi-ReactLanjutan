// TODO: answer here
import { Box, Text } from '@chakra-ui/react'

const Footer = () => {
    return (
        <Box className="footer" py={3} marginTop={5} align='center'>
            <Box className="studentName">
                <Text color="white" fontWeight='extrabold'>Deswita Ramadani</Text>
            </Box>
            <Box className="studentId">
                <Text color="white" fontWeight='extrabold'>FE5508424</Text>
            </Box>
        </Box>
    );
};

export default Footer;