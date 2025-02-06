import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MoviesList from "./components/MovieList";
import MyReservation from './pages/ReservationsPage';
import MovieDetail from './pages/MovieDetail'; 
import Profile from './pages/Profile'; 
import Navbar from './components/Navbar'; 
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
    <Router>
    <Navbar />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/movies"element={<MoviesList />} />
          <Route path="/reservation/my_reservation"element={<MyReservation />} />
          <Route path="/movies/:id"element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
