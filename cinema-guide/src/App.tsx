import "./App.module.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage/MainPage";
import { GenresPage } from "./pages/GenresPage/GenresPage";
import { MovieDetails } from "./pages/MovieDetails/MovieDetails";
import { useSelector } from "react-redux";
import { LoginModal } from "./components/LoginModal/LoginModal";
import { AppStore } from "./store/store";
import { MovieGenreList } from "./pages/MovieGenreList/page";
import { UserProfile } from "./pages/UserProfile/page";

function App() {
  const { isOpen } = useSelector((store: AppStore) => store.authModal);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/genres/:name" element={<MovieGenreList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        {isOpen && <LoginModal />}
      </main>
      <Footer />
    </>
  );
}

export default App;
