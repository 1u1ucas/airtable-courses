import { createClient } from '@/prismicio';

const ContactPage = async () => {
    const client = createClient();
    const contact = await client.getSingle('contact');
    
    return (
        <div>
        <h1>{contact.data.title}</h1>
        <p>{contact.data.description}</p>
        </div>
    );
    }