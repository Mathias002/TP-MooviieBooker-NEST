import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MoviesList from "./components/MovieList";
import MyReservation from './pages/ReservationsPage';
import MovieDetail from './pages/MovieDetail'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movies"element={<MoviesList />} />
        <Route path="/reservation/my_reservation"element={<MyReservation />} />
        <Route path="/movies/:id"element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
