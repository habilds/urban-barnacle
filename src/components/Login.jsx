import React from "react";
import {
    Box,
    Button,
    Grid,
    Heading,
    Stack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    useToast
} from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import config from "../config";
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();
    const toast = useToast();

    // Check if token is available at localStorage
    // If available then is authenticated
    React.useEffect(() => {
        if (localStorage.getItem('app_token')) {
            history.push("/");
        }
    }, []);

    const [credentials, setCredentials] = React.useState({
        username: null,
        password: null,
    });
    const [errors, setErrors] = React.useState({
        username: false,
        password: false,
    });

    const handleOnSubmit = async (event) => {
        // Prevent the submit action
        event.preventDefault();

        try {
            const response = await fetch(`${config.baseUrl}/auth`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            })
    
            if (response.ok) {
                const token = await response.json();

                // Set token
                localStorage.setItem('app_token', token.token);

                history.push("/");
            } else {
                toast({
                    status: "error",
                    title: "Username dan password tidak cocok.",
                })
            }
        } catch (error) {
            toast({
                status: "error",
                title: "Username dan password tidak cocok.",
            })
        }
    };

    // Validate username after input is out of focus or onBlur
    const handleUsernameOnBlur = () => {
        if (credentials.username === "" || credentials.username === null) {
            setErrors({ ...errors, username: true })
        } else {
            setErrors({ ...errors, username: false })
        }
    }
    
    // Validate password after input is out of focus or onBlur
    const handlePasswordOnBlur = () => {
        if (credentials.password === "" || credentials.password === null) {
            setErrors({ ...errors, password: true })
        } else {
            setErrors({ ...errors, password: false })
        }
    }

    return (
        <Box minHeight="100vh" textAlign="center" fontSize="xl">
            <Grid p={3} marginBottom={12}>
                <ColorModeSwitcher justifySelf="flex-end" />
            </Grid>
            <Box
                width="lg"
                boxShadow="sm"
                borderWidth={1}
                borderRadius="xl"
                padding={8}
                margin="0 auto"
            >
                <Heading size="md" marginBottom={6}>
                    Login
                </Heading>
                <Stack as="form" spacing={4} onSubmit={handleOnSubmit}>
                    <FormControl isInvalid={errors.username}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            onBlur={handleUsernameOnBlur}
                            onChange={e =>
                                setCredentials({
                                    ...credentials,
                                    username: e.target.value,
                                })
                            }
                        />
                        <FormErrorMessage>Username dibutuhkan</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            onBlur={handlePasswordOnBlur}
                            onChange={e =>
                                setCredentials({
                                    ...credentials,
                                    password: e.target.value,
                                })
                            }
                        />
                        <FormErrorMessage>Password dibutuhkan</FormErrorMessage>
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="facebook"
                        variant="solid"
                    >
                        Login
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default Login;
