import connectAirtable from './connect';
import { Client, Clients } from '../types/client';

const updateClient = (
  clientId: string,
  updatedFields: Partial<Omit<Client, 'id'>>, 
  setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Projets";
  const table = base(TABLE_NAME);

  const updatedClient = {
    fields: {
      ...updatedFields,  // On applique les champs mis à jour
    },
  };

  // Mise à jour dans Airtable
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

      // Mise à jour de l'état local après la mise à jour réussie
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
