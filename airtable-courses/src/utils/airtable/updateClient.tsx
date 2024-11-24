import connectAirtable from './connect';
import { Client, Clients } from '../types/client';

const updateClient = (
  clientId: string,
  updatedFields: Partial<Omit<Client, 'id'>>, // Les champs modifiables excluent l'ID
  setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Projets";
  const table = base(TABLE_NAME);

  // Préparation des champs mis à jour
  const updatedClient = {
    fields: {
      ...updatedFields,
    },
  };

  // Mise à jour dans Airtable
  table.update(
    [
      {
        id: clientId, // L'identifiant du client à mettre à jour
        fields: updatedClient.fields, // Champs mis à jour
      },
    ],
    (error, records) => {
      if (error) {
        console.error(error);
        return;
      }

      if (!records || records.length === 0) {
        console.error("No records updated");
        return;
      }

      // Mise à jour de l'état local
      setClients((previousClients) =>
        previousClients.map((client) =>
          client.id === clientId
            ? { ...client, ...updatedFields } // Fusion des anciens et nouveaux champs
            : client
        )
      );
    }
  );
};

export default updateClient;
