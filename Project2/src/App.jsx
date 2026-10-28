import { useMemo, useState } from 'react'
import ContactForm from './components/ContactForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import ContactList from './components/ContactList.jsx'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [filterText, setFilterText] = useState('')
  const [announcement, setAnnouncement] = useState('')

  const filteredContacts = useMemo(() => {
    const query = filterText.trim().toLowerCase()
    if (!query) return contacts
    return contacts.filter(({ name, email }) =>
      name.toLowerCase().includes(query) || email.toLowerCase().includes(query)
    )
  }, [contacts, filterText])

  function addContact(contact) {
    setContacts((current) => [...current, contact])
    setAnnouncement(`${contact.name} was added to your contacts.`)
  }

  function deleteContact(id) {
    const contact = contacts.find((item) => item.id === id)
    setContacts((current) => current.filter((item) => item.id !== id))
    setAnnouncement(`${contact?.name ?? 'Contact'} was deleted.`)
  }

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <div className="brand-mark" aria-hidden="true">P2</div>
          <div>
            <p className="eyebrow">React Project 2</p>
            <h1>Contact Book</h1>
            <p className="tagline">A simple, fast, and accessible place for your contacts.</p>
          </div>
        </div>
      </header>

      <main id="main-content" className="shell main-grid">
        <section className="panel form-panel" aria-labelledby="add-heading">
          <div className="section-heading">
            <span className="step" aria-hidden="true">1</span>
            <div>
              <h2 id="add-heading">Add a contact</h2>
              <p>Name and email are required. Phone is optional.</p>
            </div>
          </div>
          <ContactForm onAdd={addContact} />
        </section>

        <section className="panel contacts-panel" aria-labelledby="contacts-heading">
          <div className="section-heading contacts-heading-row">
            <span className="step" aria-hidden="true">2</span>
            <div>
              <h2 id="contacts-heading">Your contacts</h2>
              <p>{contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} saved this session</p>
            </div>
          </div>
          <SearchBar value={filterText} onChange={setFilterText} />
          <ContactList contacts={filteredContacts} onDelete={deleteContact} hasFilter={Boolean(filterText.trim())} />
        </section>
      </main>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      <footer><div className="shell">Project 2 · Built with React, JSX, props, state, and events.</div></footer>
    </>
  )
}
