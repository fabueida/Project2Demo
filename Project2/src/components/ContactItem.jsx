export default function ContactItem({ contact, onDelete }) {
  const initials = contact.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  return (
    <li className="contact-card">
      <div className="avatar" aria-hidden="true">{initials || '?'}</div>
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        {contact.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : <span className="muted">No phone number</span>}
      </div>
      <button className="delete-button" type="button" onClick={() => onDelete(contact.id)} aria-label={`Delete ${contact.name}`}>Delete</button>
    </li>
  )
}
