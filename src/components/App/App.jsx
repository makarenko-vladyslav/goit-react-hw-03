import { useState, useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

import css from "./App.module.css";

export default function App() {
  const [searchValue, setSearchValue] = useState("");

  const [contacts, setContacts] = useState(() => {
    const savedObject = window.localStorage.getItem("contacts");

    return savedObject
      ? JSON.parse(savedObject)
      : [
          { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
          { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
          { id: "id-3", name: "Eden Clements", number: "645-17-79" },
          { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ];
  });

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  function handleSearch(evt) {
    setSearchValue(evt.target.value);
  }

  const deleteContact = (contactId) => {
    setContacts((prevTasks) => {
      return prevTasks.filter((task) => task.id !== contactId);
    });
  };

  function addContact(values, actions) {
    setContacts((prevContacts) => [
      ...prevContacts,
      {
        id: values.id,
        name: values.name,
        number: values.number,
      },
    ]);

    actions.resetForm();
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAdd={addContact} />
        <SearchBox searchValue={searchValue} handleSearch={handleSearch} />
        <ContactList
          contacts={searchValue ? filteredContacts : contacts}
          onDelete={deleteContact}
        />
      </div>
    </>
  );
}
