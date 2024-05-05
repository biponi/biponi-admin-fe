import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import useLoginAuth from "./hooks/useLoginAuth";
import { ReloadIcon } from "@radix-ui/react-icons";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLoginAuth();
  return (
    <div className='w-full h-[100vh]  flex justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email or phone number below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email or Phone Number</Label>
            <Input
              id='email'
              type='text'
              value={username}
              placeholder='m@example.com'
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={loading}
            className='w-full'
            onClick={() => {
              login(username, password);
            }}>
            {loading ? "Siging in..." : "Sign in"}
            {loading && <ReloadIcon className='ml-2 h-4 w-4 animate-spin' />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
