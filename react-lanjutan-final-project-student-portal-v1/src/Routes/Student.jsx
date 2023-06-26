import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { 
    Container, 
    Text,
    Box,
    Flex, 
    Select, 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button
} from "@chakra-ui/react"

const Student = () => {
    const [students, setStudents] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])
    const [selectedFaculty, setSelectedFaculty] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStudents()
    }, [])

    useEffect(() => {
        filterStudents()
    }, [students, selectedFaculty])

    const fetchStudents = async () => {
        try {
            const response = await fetch("http://localhost:3001/student")
            const data = await response.json()
            setStudents(data)
            setLoading(false)
        } catch (error) {
            console.log("Error fetching students:", error);
        }
    }

    const filterStudents = async () => {
        if (selectedFaculty === 'All' || selectedFaculty === '') {
            setFilteredStudents(students)
        } else {
            const filtered = students.filter(student => student.faculty === selectedFaculty)
            setFilteredStudents(filtered)
        }
    }

    const handleDelete = async (id) => {
        try {
            const url = (`http://localhost:3001/student/${id}`)
            await fetch(url, {
                method : 'DELETE'
            })
            const updatedStudents = students.filter(
                (student) => student.id !== id
            );
            setStudents(updatedStudents);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
            <Container alignItems="center" justifyContent="center" maxW="150vh">
                <Text fontWeight="bold" fontSize="2rem" marginBottom="1rem" textAlign="center" color="pink.300">
                    Data Mahasiswa 
                </Text>
                <Select
                maxW="40vh"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                data-testid="filter"
                color= "pink.400"
                >
                    <option value="All">All</option>
                    <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                    <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
                    <option value="Fakultas Teknik">Fakultas Teknik</option>
                    <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
                </Select>
            { loading ? (
                <p>Loading ...</p>
                ) : (
                <TableContainer>
                    <Table id="table-student">
                        <Thead>
                            <Tr>
                                <Th color="pink.700" fontSize="0.8rem">No</Th>
                                <Th color="pink.700" fontSize="0.8rem">Full Name</Th>
                                <Th color="pink.700" fontSize="0.8rem">Faculty</Th>
                                <Th color="pink.700" fontSize="0.8rem">Program Study</Th>
                                <Th color="pink.700" fontSize="0.8rem">Option</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredStudents && filteredStudents.map((student, index) => (
                                <Tr key={student.id} className="student-data-row">
                                <Td>{index + 1}</Td>
                                <Td>
                                    <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                                </Td>
                                <Td>{student.faculty}</Td>
                                <Td>{student.programStudy}</Td>
                                <Td>
                                    <Button
                                    colorScheme="pink"
                                    onClick={() => handleDelete(student.id)}
                                    data-testid={`delete-${student.id}`}
                                    >
                                    Delete
                                    </Button>
                                </Td>
                            </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
            </Container>
            <Box
            py={1}
            backgroundImage="url('https://media.istockphoto.com/id/1354854285/photo/magenta-abstract-background-toned-concrete-wall-texture-painted-rough-background.jpg?s=170667a&w=0&k=20&c=b61ZMicTZ3vHpMyGL3wgu3IWht9AAnTg8nLbb8GBTZM=')"
            width="100%">
              <Flex justifyContent="center">
                <Box width="100%" maxWidth="1200px" marginTop={-5}>
                  <Footer />
                </Box>
              </Flex>
            </Box>
        </>
    );
};

export default Student;