import React from "react";
import {
    Box,
    Button,
    Grid,
    Stack,
    Select,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    useToast
} from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import config from "../config";

function Home() {
    const toast = useToast();

    const [data, setData] = React.useState([]);
    const [body, setBody] = React.useState({ type: null, founded_at: null });
    const [errors, setErrors] = React.useState({
        type: false,
        founded_at: false,
    });

    const fetchData = () => {
        fetch(`${config.baseUrl}/companies`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("app_token")}`,
            },
        })
        .then(response => response.json())
        .then(response => setData(response.data));
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleOnSubmit = async (event) => {
        // Prevent the submit action
        event.preventDefault();

        try {
            const response = await fetch(`${config.baseUrl}/companies`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('app_token')}`
                },
                body: JSON.stringify(body),
            })
    
            if (response.ok) {
                fetchData();
            } else {
                toast({
                    status: "error",
                    title: "Gagal menambah data.",
                })
            }
        } catch (error) {
            toast({
                status: "error",
                title: "Gagal menambah data.",
            })
        }
    };

    // Validate type after input is out of focus or onBlur
    const handleTypeOnBlur = () => {
        if (body.type === "" || body.type === null) {
            setErrors({ ...errors, type: true })
        } else {
            setErrors({ ...errors, type: false })
        }
    }
    
    // Validate founded_at after input is out of focus or onBlur
    const handleFoundedAtOnBlur = () => {
        if (body.founded_at === "" || body.founded_at === null) {
            setErrors({ ...errors, founded_at: true })
        } else {
            setErrors({ ...errors, founded_at: false })
        }
    }

    return (
        <Box minH="100vh" textAlign="center">
            <Grid p={3} marginBottom={12}>
                <ColorModeSwitcher justifySelf="flex-end" />
            </Grid>
            <Box
                width="2xl"
                boxShadow="sm"
                borderWidth={1}
                borderRadius="xl"
                padding={8}
                margin="0 auto"
            >
                <Stack as="form" spacing={4} onSubmit={handleOnSubmit}>
                    <FormControl isInvalid={errors.type}>
                        <FormLabel>Tipe Perusahaan</FormLabel>
                        <Select name="type" onBlur={handleTypeOnBlur} onChange={(e) => setBody({ ...body, type: e.target.value })}>
                            <option value="Perseorangan">Perseorangan</option>
                            <option value="CV">CV</option>
                            <option value="Firma">Firma</option>
                            <option value="PT">PT</option>
                        </Select>
                        <FormErrorMessage>
                            Tipe perusahaan dibutuhkan
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.founded_at}>
                        <FormLabel>Tanggal Berdiri</FormLabel>
                        <Input type="date" name="founded_at" onBlur={handleFoundedAtOnBlur} onChange={(e) => setBody({ ...body, founded_at: e.target.value })} />
                    </FormControl>
                    <Button type="submit" colorScheme="facebook" variant="solid">
                        Kirim
                    </Button>
                </Stack>
            </Box>
            <Box width="4xl" margin="0 auto" paddingY={6}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Tipe Perusahaan</Th>
                            <Th>Tanggal Berdiri</Th>
                            <Th>Status</Th>
                            <Th isNumeric>Biaya Pendaftaran</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map(item => (
                            <Tr key={item.id}>
                                <Td>{item.type}</Td>
                                <Td>{item.founded_at}</Td>
                                <Td>{item.late_status}</Td>
                                <Td isNumeric>{item.biaya_pendaftaran}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}

export default Home;
