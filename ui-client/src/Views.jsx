import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubTasks from "./SubTasks"
import PageNotFound from "./PageNotFound";
import Home from "./Home";
import Tasks from "./Tasks";
import Projects from "./Projects"
import PostRequestTest from "./PostRequestTest";
import TaskCompV2 from "./TaskCompV2";
import Login from "./Login"
import SignUp from "./SignUp";
import ProjectTest from "./ProjectTest";
import Friends from "./Friends"
const Views = () => {

    return(
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/subtasks" element={<SubTasks />}/>
            <Route path="/tasks" element={<Tasks />}/>
            <Route path="/projects" element={<Projects />} />
            <Route path="/posttest" element={<PostRequestTest />} />
            <Route path="/taskv2" element={<TaskCompV2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/pt" element={<ProjectTest />} />
            <Route path="/friends" element={<Friends/>} />

            <Route path="*" element={<PageNotFound />}/>
        </Routes>
    );
}
export default Views;