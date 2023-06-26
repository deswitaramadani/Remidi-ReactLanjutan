// TODO: answer here
import { useState } from "react";
import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom";
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

const AddStudent = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [programStudy, setProgramStudy] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const faculty = getFacultyByProgramStudy(programStudy);

    const studentData = {
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
      await fetch("http://localhost:3001/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      navigate("/student");
    } catch (err) {
      console.log(err);
    }
  };

  const getFacultyByProgramStudy = (programStudy) => {
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        return "Fakultas Ekonomi";
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        return "Fakultas Ilmu Sosial dan Politik";
      case "Teknik Sipil":
      case "Arsitektur":
        return "Fakultas Teknik";
      case "Matematika":
      case "Fisika":
      case "Informatika":
        return "Fakultas Teknologi Informasi dan Sains";
      default:
        return "";
    }
  };
  return (
    <>
      <NavBar />
      <Container alignItems="center" justifyContent="center" minHeight="100vh">
        <Text
          fontWeight="bold"
          fontSize="2rem"
          marginBottom="1rem"
          textAlign="center"
          color="pink.500"
        >
          Add Student
        </Text>
        <FormControl id="form-student" onSubmit={handleSubmit}>
          <FormLabel htmlFor="input-name" color="black" fontSize="1rem">Fullname</FormLabel>
          <Input
            color="black"
            type="text"
            id="input-name"
            data-testid="name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <FormLabel htmlFor="input-profile" color="black" fontSize="1rem">Profile Picture</FormLabel>
          <Input
            color="black"
            type="text"
            id="input-profile"
            data-testid="profilePicture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
          <FormLabel htmlFor="input-address" color="black" fontSize="1rem">Address</FormLabel>
          <Input
            color="black"
            type="text"
            id="input-address"
            data-testid="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormLabel htmlFor="input-phone" color="black" fontSize="1rem">Phone Number</FormLabel>
          <Input
            color="black"
            type="text"
            id="input-phone"
            data-testid="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FormLabel htmlFor="input-date" color="black" fontSize="1rem">Birth Date</FormLabel>
          <Input
            color="black"
            type="date"
            id="input-date"
            data-testid="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <FormLabel htmlFor="input-gender" color="black" fontSize="1rem">Gender</FormLabel>
          <Input
            color="black"
            type="text"
            id="input-gender"
            data-testid="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <FormLabel htmlFor="input-prody" color="black" fontSize="1rem">Program Study</FormLabel>
          <Select
          color="black"
          id="input-prody"
          data-testid="prody"
          value={programStudy}
          onChange={(e) => setProgramStudy(e.target.value)}
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
          <Container textAlign='center'>
            <Button
              marginTop={4}
              colorScheme="purple"
              type="submit"
              onClick={handleSubmit}
              value="Add student"
              id="add-btn"
              data-testid="add-btn">
            Add Student
            </Button>
          </Container>
        </FormControl>
      </Container>
      <Box>
        <Footer/>
      </Box>
    </>
  );
};

export default AddStudent;