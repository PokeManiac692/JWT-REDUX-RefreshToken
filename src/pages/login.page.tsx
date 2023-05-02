import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { styled } from "@mui/material/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Container, Box, Typography } from "@mui/material";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { useLoginUserMutation } from "../redux/api/authApi";
import FormInput from "../components/FormInput";

// Define a styled component called LoadingButton based on the _LoadingButton component
const LoadingButton = styled(_LoadingButton)`
  background-color: black;
`;

// Define a schema called loginSchema using the object() function, 
//      which returns a new instance of the Yup object schema. 
// The schema validates a login form, ensuring that the email field is a string 
//      of at least one character that is a valid email address and that the password 
//      field is a string of at least one character, at least 8 characters long, and 
//      no longer than 32 characters.
const loginSchema = object({
  email: string()
    .min(1, "Email is required")
    .email("Email address is not valid"),
  password: string()
    .min(1, "Password is required"),
});

// Define a type LoginInput that corresponds to the schema defined in loginSchema
export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  // Define the form methods for useForm with the resolver set to the zodResolver for the login schema
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // Destructure variables from the useLoginUserMutation hook
  const [loginUser, { isLoading, isSuccess, error, isError, data }] = useLoginUserMutation();

  // Get the navigation object from the useNavigate hook
  const navigate = useNavigate();

  // Destructure methods from useForm for form control
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  // Handle the success and error cases of the loginUser mutation
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/dashboard");
    }

    if (isError) {
      toast.error((error as any).data.message, { position: "top-right" });
    }
  }, [isLoading]);

  // Reset the form when it is successfully submitted
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, []);

  // Define a SubmitHandler function that takes in LoginInput type values and calls the loginUser function
  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };


  // Render the Login Page component
return (
    // Use the Material-UI Container component to set the layout
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#a7bceb",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Use the Material-UI Typography component to render the login title */}
        <Typography> <h1> Redux Login </h1> </Typography>
  
        {/* Use FormProvider to provide the form context */}
        <FormProvider {...methods}>
          {/* Use Box component to set form attributes */}
          <Box
            component="form"
            noValidate
            width="100%"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            {/* Render two form input fields, one for email and one for password */}
            <FormInput
              name="email"
              type="email"
              label="Enter the email"
            ></FormInput>
            <FormInput
              name="password"
              type="password"
              label="Enter the password"
            ></FormInput>
  
            {/* Use LoadingButton component to render the form submit button */}
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              disableElevation
              fullWidth
            >
              Log In
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};  

export default LoginPage;