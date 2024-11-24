import { useEffect, useState } from "react";
import { getClients } from "./utils/airtable";
import { Client } from "./utils/types/client";
import ClientForm from "./components/ClientForm/Clientform";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";    

function Form() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getClients(setClients);
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Page Formulaire</h1>
        <p className="mb-6">Vous êtes sur la page de formulaire</p>
        <ClientForm setClients={setClients} />
      </div>
        <Footer />
    </>
  );
}

export default Form;