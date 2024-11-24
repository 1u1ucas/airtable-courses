import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function Home() {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Bienvenue sur la page d'accueil</h1>
        <p className="text-lg text-gray-600">Ceci est la page d'accueil de notre application.</p>
      </div>
        <Footer />
    </>
  );
}

export default Home;