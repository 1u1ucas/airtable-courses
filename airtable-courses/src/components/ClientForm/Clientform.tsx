import React, { useState } from "react";
import { createClient } from "../../utils/airtable";
import { ClientDto, Client } from "../../utils/types/client";

const ClientForm = (
  { setClients }: { setClients: React.Dispatch<React.SetStateAction<Client[]>> }
) => {
  const [formData, setFormData] = useState<ClientDto>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submitted");
    createClient(formData, setClients);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, event.target.value);
    setFormData((previousFormData) => {
      return {
        ...previousFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="firstname"
        placeholder="Votre Prénom"
        required
        onChange={handleChange}
        value={formData.firstname}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="lastname"
        placeholder="Votre Nom"
        required
        onChange={handleChange}
        value={formData.lastname}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Votre Email"
        required
        onChange={handleChange}
        value={formData.email}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Votre Téléphone"
        required
        onChange={handleChange}
        value={formData.phoneNumber}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Vous ajouter
      </button>
    </form>
  );
};

export default ClientForm;