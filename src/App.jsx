import Navbar from "./layout/NavBar.jsx";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Rewards from "./pages/Rewards.jsx";
import Footer from "./components/Shared/Footer.jsx";
import Profile from "./pages/Profile.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        )
    )

  return (
    <>
        <RouterProvider router={router}/>
        <Footer />
        <ToastContainer />
    </>
  )
}

export default App
