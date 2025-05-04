import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDispatch } from "react-redux";
import { userCreateRequest } from "@/store/user/slices";

const Signup = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeat_password: "",
      terms: "",
    },
    mode: "onSubmit", // Validate on submit
    resolver: async (data) => {
      const errors: Record<string, { message: string }> = {};

      if (!data.name) {
        errors.name = { message: "Name is required." };
      }

      if (!data.email) {
        errors.email = { message: "Email is required." };
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = { message: "Email is invalid." };
      }

      if (!data.password) {
        errors.password = { message: "Password is required." };
      } else if (data.password.length < 6) {
        errors.password = {
          message: "Password must be at least 6 characters.",
        };
      }

      if (!data.repeat_password) {
        errors.repeat_password = { message: "Repeat password is required." };
      } else if (data.repeat_password !== data.password) {
        errors.repeat_password = { message: "Passwords do not match." };
      }

      if (!data.terms) {
        errors.terms = { message: "Agree to the Terms of Service ." };
      }

      return {
        values: data,
        errors,
      };
    },
  });

  const onSubmit = (data: any) => {
    const { name, email, password, repeat_password: repeatedPassword } = data;
    dispatch(
      userCreateRequest({
        name,
        email,
        password,
        repeatedPassword,
        image: null,
      }),
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="mt-6 text-3xl font-extrabold gradient-text text-center">
                Create an account
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-gray-600 text-center">
                Sign up to get started with Chat Docs!
              </CardDescription>
            </CardHeader>
            <hr className="mb-10 w-4/5 mx-auto" />
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="repeat_password"
                    render={({ field, fieldState }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field, fieldState }) => (
                      <FormItem className="mb-4">
                        <div className="flex items-center space-x-1">
                          <FormControl className="flex-[1] ">
                            <Input type="checkbox" {...field} />
                          </FormControl>
                          <span className="flex-[9] text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            I agree to the{" "}
                            <Link
                              to="#"
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="#"
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              Privacy Policy
                            </Link>
                          </span>
                        </div>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full button-gradient"
                    disabled={form.formState.isSubmitting}
                  >
                    Sign up
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
