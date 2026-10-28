import { useState } from 'react'

const initialForm = { name: '', email: '', phone: '' }

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter a name.'
    if (!form.email.trim()) nextErrors.email = 'Please enter an email address.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Please enter a valid email address.'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      document.getElementById(nextErrors.name ? 'name' : 'email')?.focus()
      return
    }

    onAdd({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    })
    setForm(initialForm)
    setErrors({})
    document.getElementById('name')?.focus()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name <span aria-hidden="true">*</span><span className="sr-only">required</span></label>
        <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
        {errors.name && <p className="error" id="name-error">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="email">Email <span aria-hidden="true">*</span><span className="sr-only">required</span></label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
        {errors.email && <p className="error" id="email-error">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="phone">Phone <span className="optional">Optional</span></label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={handleChange} />
      </div>
      <button className="primary-button" type="submit">Add contact</button>
    </form>
  )
}
