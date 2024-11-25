import connectAirtable from './connect';
import { Client, Clients, Status } from '../types/client';

const updateClient = (
  clientId: string,
  updatedFields:  { firstName?: string; lastName?: string; email?: string; phoneNumber: string; notes?: string; status: Status; }, 
  setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Projets";
  const table = base(TABLE_NAME);

  const updatedClient = {
    fields: {
      ...updatedFields,
    },
  };

  table.update(
    [
      {
        id: clientId, 
        fields: updatedClient.fields,
      },
    ],
    (error, records) => {
      if (error) {
        console.error("Erreur de mise à jour :", error);
        return;
      }

      if (!records || records.length === 0) {
        console.error("Aucun enregistrement mis à jour");
        return;
      }

      setClients((previousClients) =>
        previousClients.map((client) =>
          client.id === clientId
            ? { ...client, ...updatedFields }
            : client
        )
      );
    }
  );
};

export default updateClient;
