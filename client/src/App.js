import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import Login from "./components/login/Login"
import PublicLayout from "./components/Auth/PublicLayout"
import BoardRead from "./components/board/BoardRead";
import BoardWrite from "./components/board/BoardWrite"
import Board from "./components/board/Board";
import Users from "./components/users/Users";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import BoardEdit from "./components/board/BoardEdit";

function App() {
    return (
        <Container style={{
            minWidth : "1024px"
        }}>
            <Routes>
                <Route element={<PublicLayout/>} errorElement={<error-page />}>
                    <Route path="/" element={<Login/>}/>
                </Route>

                <Route element={<AuthLayout/>} errorElement={<error-page />}>
                    <Route path="/main" exact element={<Board/>}/>
                    <Route path="/read/:id" exact element={<BoardRead/>}/>
                    <Route path="/write" exact element={<BoardWrite/>}/>
                    <Route path="/edit/:id" exact element={<BoardEdit/>}/>
                    <Route path="/users" exact element={<Users/>}/>
                    <Route path="/adduser" exact element={<AddUser/>}/>
                    <Route path="/edituser/:id" exact element={<EditUser/>}/>
                </Route>
            </Routes>
        </Container>
    )
}

export default App;
