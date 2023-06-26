// TODO: answer here
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import {
    Container,
    FormControl,
    Text,
    FormLabel,
    Input,
    Button,
    Box,
    Select
} from "@chakra-ui/react";
import Footer from '../components/Footer';

const EditStudent = () => {
    // TODO: answer here
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        fullname: '',
        address: '',
        phoneNumber: '',
        birthDate: '',
        gender: '',
        programStudy: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/student/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setFormData(data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const {
            fullname,
            profilePicture,
            address,
            phoneNumber,
            birthDate,
            gender,
            programStudy,
        } = formData;

        const faculty = getFacultyByProgramStudy(programStudy);

        const updatedStudent = {
            fullname,
            profilePicture,
            address,
            phoneNumber,
            birthDate,
            gender,
            faculty,
            programStudy,
        };

        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });
            navigate('/student');
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, 
            [event.target.id]: event.target.value })
    }

    const getFacultyByProgramStudy = (programStudy) => {
        switch (programStudy) {
            case 'Ekonomi':
            case 'Manajemen':
            case 'Akuntansi':
                return 'Fakultas Ekonomi';
            case 'Administrasi Publik':
            case 'Administrasi Bisnis':
            case 'Hubungan Internasional':
                return 'Fakultas Ilmu Sosial dan Politik';
            case 'Teknik Sipil':
            case 'Arsitektur':
                return 'Fakultas Teknik';
            case 'Matematika':
            case 'Fisika':
            case 'Informatika':
                return 'Fakultas Teknologi Informasi dan Sains';
            default:
                return '';
        }
    };

    return (
        <>
            <NavBar />
            {loading ? (
                <p>Loading ...</p>
            ) : (
                <Container alignItems="center" justifyContent="center" minHeight="100vh" className='edit-std'>
                    <Text
                    fontWeight="bold"
                    fontSize="2rem"
                    marginBottom="1rem"
                    textAlign="center"
                    >
                        Edit Student
                    </Text>
                    <Box align='center' className="image">
                        <img src={formData.profilePicture} alt="Profile" className="image" />
                    </Box>
                    <FormControl class="form-edit" onSubmit={handleSubmit}>
                        <Box className='item'>
                            <FormLabel htmlFor="fullname">Full Name:</FormLabel>
                            <Input type="text" id="fullname" data-testid="name" value={formData.fullname} onChange={handleChange}/>
                        </Box>
                        <Box className='item'>
                            <FormLabel htmlFor="address">Address:</FormLabel>
                            <Input type="text" id="address" data-testid="address" value={formData.address} onChange={handleChange}/>
                        </Box>
                        <Box className='item'>
                            <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
                            <Input type="text" id="phoneNumber" data-testid="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </Box>
                        <Box className='grid-container'>
                            <Box>
                                <FormLabel htmlFor="birthDate">Birth Date:</FormLabel>
                                <Input type="date" id="birthDate" data-testid="date" value={formData.birthDate} onChange={handleChange} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="gender">Gender:</FormLabel>
                                <Input
                                    type="text"
                                    id="gender"
                                    data-testid="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>
                        <Box className='item'>
                            <FormLabel htmlFor="programStudy">Program Study:</FormLabel>
                            <Select
                            id="programStudy"
                            data-testid="prody"
                            value={formData.programStudy}
                            onChange={handleChange}
                            >
                                <option value="Ekonomi">Ekonomi</option>
                                <option value="Manajemen">Manajemen</option>
                                <option value="Akuntansi">Akuntansi</option>
                                <option value="Administrasi Publik">Administrasi Publik</option>
                                <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                                <option value="Hubungan Internasional">Hubungan Internasional</option>
                                <option value="Teknik Sipil">Teknik Sipil</option>
                                <option value="Arsitektur">Arsitektur</option>
                                <option value="Matematika">Matematika</option>
                                <option value="Fisika">Fisika</option>
                                <option value="Informatika">Informatika</option>
                            </Select>
                        </Box>
                        <Box textAlign='center'>
                            <Button
                            marginTop={4}
                            colorScheme="green"
                            type="submit"
                            onClick={handleSubmit}
                            value="Edit Student"
                            id="edit-btn"
                            data-testid="edit-btn">
                                Edit Student
                            </Button>
                        </Box>
                    </FormControl>
                </Container>
            )}
            <Box>
                <Footer/>
            </Box>
        </>
    );
};

export default EditStudent;