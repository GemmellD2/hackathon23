import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useAuth } from '../AuthContext';
  import { getAllUserIds } from "../services";
  import { useState } from "react";
  import { useNavigate } from 'react-router-dom';

  const allUserIds = await getAllUserIds();
   
  export function Login() {
    const { isLoggedIn, login, logout } = useAuth();
    const [userIdInput, setUserIdInput] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (userIdInput === "admin" || allUserIds.includes(parseInt(userIdInput))) {
          login(userIdInput);
          navigate('/')
        }  
        else{
            logout();
        }
      };
      
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          This is just a mock login page for demonstration purposes.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your UserID
            </Typography>
            <Input
              size="lg"
              placeholder="123456"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleLogin}>
            login
          </Button>
        </form>
      </Card>
      </div>
    );
  }
  export default Login;