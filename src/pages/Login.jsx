
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { Link,useNavigate} from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FormHook } from "../hooks/FormHook";
import { LoginMessages } from "../helpers/Messages/LoginMessages";
import '../styles/login.css'


const Login = () => {
   const {login} = useContext(UserContext);
   const {data,updateData,clearData} = FormHook({email:"",password:""});
   const navigator = useNavigate();

   console.log(data);

   const onLogin = async(event)=>{
    event.preventDefault();
    LoginMessages.Success("Login Succesfully")
    navigator("/users/dashboard",{replace:true});
      //const response = await login(data.email,data.password);
      
      //  if(response.isSuccess){
         // MessageSuccess.loginSuccess("Loggin Succesfully");
         // navigator("/users/dashboard",{replace:true});
       //   return;
        //}else{
            LoginMessages.Failed("datos incorrectos");
      //  }



   }

   const handleData = ({target})=>{
       const {value,name} = target;
       updateData(name,value);
       console.log(data);
   }
   
  return (
    <div className="container-login">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
          <div className="mb-4 d-flex flex-column align-items-center justify-content-center text-center">
              <Link to="/">
                <FaUserLarge style={{ fontSize: "3rem", color: "#edac58" }} />
              </Link>
              <p className="mb-6">Ingresa tus datos</p>
          </div>


              <Form onSubmit={onLogin}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter address here"
                    onChange={handleData}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="**************"
                    onChange={handleData}
                    required
                  />
                </Form.Group>

                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  <div className="d-grid">
                  <Button style={{ backgroundColor: "#edac58", borderColor: "#edac58", color: "#fff" }} type="submit">
                         Sign In
                  </Button>
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div>
                      <Link
                        to="/register"
                        className="text-inherit fs-5 text-forgot-login"
                      >
                        <span>Forgot your password?</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </div>
    
  );
};

export default Login;
