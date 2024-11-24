import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-white shadow-md mt-8">
      <nav className="container mx-auto p-4">
        <ul className="flex justify-end space-x-4">
          <li>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded transition duration-300"
            >
                Accueil
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/form')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded transition duration-300"
            >
              Formulaire
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded transition duration-300"
            >
              Admin
            </button>
          </li>
        </ul>
      </nav>
      <div className="container mx-auto p-4 text-center">
        <p className="text-sm">&copy; 2024 Ma Société. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;