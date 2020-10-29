import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_POLL } from "../utils/mutations";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Textarea,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/core";

function CreateQuestion() {
  const [formState, setFormState] = useState({ question: "" });
  const [addPoll] = useMutation(ADD_POLL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addPoll({
        variables: { question: formState.question },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="80%" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Post a Question for the CEO</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel></FormLabel>
              <Textarea
                name="question"
                type="text"
                wrap="wrap"
                placeholder="Enter your question here!"
                height="100px"
              />
            </FormControl>
            <Button
              type="submit"
              variantColor="purple"
              variant="outline"
              width="full"
              mt={4}
            >
              Add Anonymously
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default CreateQuestion;
