import connectAirtable from "./connect";
import { Client, Clients } from "../types/client";



const getClients = (
    setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Projets";
  const table = base(TABLE_NAME);

  const GRID_VIEW_NAME = "Vue de tableur";

  table
    .select({
        view: GRID_VIEW_NAME,
        })
    .eachPage(
        (records, fetchNextPage) => {
            for (const record of records) {
                console.log(record);
                
                setClients((previousClients) => {
                    return [
                        ...previousClients,
                        {
                            id: record.id,
                            ...record.fields,

                        } as Client,
                    ]

                } )
            }
            fetchNextPage();
        },
        (error) => {
            if (error) {
                console.error(error);
            }
        }   
    );
};

export default getClients;