export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <label htmlFor="contact-search">Search contacts</label>
      <div className="search-control">
        <span aria-hidden="true" className="search-icon">⌕</span>
        <input id="contact-search" type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search by name or email" autoComplete="off" />
        {value && <button type="button" className="clear-button" onClick={() => onChange('')} aria-label="Clear contact search">Clear</button>}
      </div>
    </div>
  )
}
