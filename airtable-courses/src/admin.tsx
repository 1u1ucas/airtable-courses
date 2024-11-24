import { useEffect, useState } from "react";
import { getClients } from "./utils/airtable";
import { Clients } from "./utils/types/client";
import Chip from "./components/Chip/chip";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function Admin() {
  const [clients, setClients] = useState<Clients>([]);

  useEffect(() => {
    getClients(setClients);
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Page Admin</h1>
        <p className="mb-6">Vous êtes sur la page admin</p>
        <ul className="space-y-4">
          {clients.map((client) => (
            <li key={client.id} className="p-4 bg-white shadow rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">ID : {client.id}</p>
                  <p>{client.firstname} {client.lastname}</p>
                  <p>Email : {client.email}</p>
                  <p>Téléphone : {client.phoneNumber}</p>
                  <p>Notes : {client.notes}</p>
                </div>
                <Chip status={client.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>
        <Footer />
    </>
  );
}

export default Admin;