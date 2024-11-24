import connectAirtable from './connect';
import { Clients } from '../types/client';

const deleteClient = (
  clientId: string,
  setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Projets";
  const table = base(TABLE_NAME);

  table.destroy([clientId], (error, deletedRecords) => {
    if (error) {
      console.error(error);
      return;
    }

    if (!deletedRecords) {
      console.error("No records deleted");
      return;
    }

    setClients((previousClients) =>
      previousClients.filter((client) => client.id !== clientId)
    );
  });
};

export default deleteClient;
