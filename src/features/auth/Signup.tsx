import {
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    Button,
    Divider,
    Center
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { useSignUpMutation } from "../../services/auth";
  import { Link, useHistory } from "react-router-dom";
  import { UserSignUp } from "src/models/User";
  import { signupSchema } from "src/schemas/Auth";
  
  function PasswordInput({
    name,
    onChange
  }: {
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
  
    return (
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          name={name}
          onChange={onChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }
  
  export const Signup = () => {
    const { push } = useHistory();
  
    const [formState, setFormState] = useState<UserSignUp>({
      username: "",
      password: "",
      passwordRepeat: "",
      email: "",
    });

    const [errors, setErrors] = useState<{[key: string]: boolean}>();
  
    const [signup, { isLoading }] = useSignUpMutation();

    const validate = async () => {
      return signupSchema.validate(formState).catch(err => console.log(err));
    }
    
    const handleSignup = async () => {
      await validate();
      try {
        const result = await signup(formState);
        if (result.data) {
          push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    const handleChange = ({
      target: { name, value }
    }: React.ChangeEvent<HTMLInputElement>) =>
      setFormState((prev) => ({ ...prev, [name]: value }));
  
    return (
      <Center h="500px">
        <VStack spacing="4">
          <InputGroup>
            <Input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="email"
            />
          </InputGroup>

          <InputGroup>
            <Input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="username"
            />
          </InputGroup>
  
          <InputGroup>
            <PasswordInput onChange={handleChange} name="password" />
          </InputGroup>

          <InputGroup>
            <PasswordInput onChange={handleChange} name="passwordRepeat" />
          </InputGroup>

          <Button
            isFullWidth
            onClick={handleSignup}
            colorScheme="green"
            isLoading={isLoading}
          >
            Sign Up
          </Button>

          <Link to="/login">Login</Link>
          
          <Divider />
        </VStack>
      </Center>
    );
  };
  