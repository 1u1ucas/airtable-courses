import { useEffect, useState } from "react";
import { getClients, updateClient, deleteClient } from "./utils/airtable";
import { Clients, Client, ClientDto, Status } from "./utils/types/client";
import Chip from "./components/Chip/chip";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function Admin() {
  const [clients, setClients] = useState<Clients>([]);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [tempClient, setTempClient] = useState<Partial<Client>>({});

  useEffect(() => {
    getClients(setClients);
  }, []);

  const handleEditClick = (id: string, client: Client) => {
    setEditingClientId(id);
    setTempClient({ ...client });
  };

  const handleInputChange = (field: keyof Client, value: string) => {
    setTempClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleChipChange = (newStatus: Status) => {
    setTempClient((prev) => ({ ...prev, status: newStatus }));
  };

  const handleConfirmClick = async () => {
    if (editingClientId && tempClient) {

      await updateClient(editingClientId, tempClient as { firstName?: string; lastName?: string; email?: string; phoneNumber: string; notes?: string; status: Status; } , setClients);
      setEditingClientId(null); 
      setTempClient({}); 
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      await deleteClient(id, setClients);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Page Admin</h1>
        <p className="mb-6">Vous êtes sur la page admin</p>
        <ul className="space-y-4">
          {clients.map((client) => (
            <li key={client.id} className="p-4 bg-white shadow rounded-lg">
              {editingClientId === client.id ? (
                <div>
                  <input
                    className="block mb-2 p-2 border rounded"
                    value={tempClient.firstname || ""}
                    onChange={(e) =>
                      handleInputChange("firstname", e.target.value)
                    }
                  />
                  <input
                    className="block mb-2 p-2 border rounded"
                    value={tempClient.lastname || ""}
                    onChange={(e) =>
                      handleInputChange("lastname", e.target.value)
                    }
                  />
                  <input
                    className="block mb-2 p-2 border rounded"
                    value={tempClient.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <input
                    className="block mb-2 p-2 border rounded"
                    value={tempClient.phoneNumber || ""}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                  />
                  <textarea
                    className="block mb-2 p-2 border rounded"
                    value={tempClient.notes || ""}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                  <Chip
                    status={tempClient.status || Status.NOT_CONTACTED}
                    editable={true}
                    onChangeStatus={handleChipChange}
                  />
                  <button
                    onClick={handleConfirmClick}
                    className="mt-4 mr-2 px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => setEditingClientId(null)}
                    className="mt-4 px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">ID : {client.id}</p>
                    <p>{client.firstname} {client.lastname}</p>
                    <p>Email : {client.email}</p>
                    <p>Téléphone : {client.phoneNumber}</p>
                    <p>Notes : {client.notes}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Chip status={client.status} editable={false} />
                    <button
                      onClick={() => handleEditClick(client.id, client)}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteClick(client.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
