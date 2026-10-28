import ContactItem from './ContactItem.jsx'

export default function ContactList({ contacts, onDelete, hasFilter }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state" role="status">
        <div className="empty-icon" aria-hidden="true">◎</div>
        <h3>{hasFilter ? 'No matching contacts' : 'No contacts yet'}</h3>
        <p>{hasFilter ? 'Try a different name or email.' : 'Add one above to start your contact book.'}</p>
      </div>
    )
  }

  return (
    <ul className="contact-list" aria-label="Contacts">
      {contacts.map((contact) => <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />)}
    </ul>
  )
}
