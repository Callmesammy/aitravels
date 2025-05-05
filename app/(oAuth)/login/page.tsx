import NextAction from "../server-comp";
import LoginPage from "./Login-page";

const Login = async () => {
    await NextAction()
    return LoginPage;
}
 
export default Login;