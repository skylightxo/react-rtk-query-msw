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
import { useLoginMutation } from "../../services/auth";
import { setCredentials } from "../../store/auth/authSlice";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserLogin } from "src/models/User";

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

export const Login = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [formState, setFormState] = useState<UserLogin>({
    username: "",
    password: ""
  });

  const [login, { isLoading }] = useLoginMutation();

  
  const handleLogin = async () => {
    try {
      const result = await login(formState);
      if (result.data) {
        dispatch(setCredentials(result.data));
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
            name="username"
            type="text"
            placeholder="Email"
          />
        </InputGroup>

        <InputGroup>
          <PasswordInput onChange={handleChange} name="password" />
        </InputGroup>
        <Button
          isFullWidth
          onClick={handleLogin}
          colorScheme="green"
          isLoading={isLoading}
        >
          Login
        </Button>
          
        <Link to="/signup">Sign up</Link>
          
        <Divider />
      </VStack>
    </Center>
  );
};
