import { useState } from 'react'

const emptyState = {
  name: '',
  email: '',
  role: '',
}

function UserForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData ?? emptyState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = {
      ...initialData,
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role.trim(),
    }

    if (!payload.name || !payload.email || !payload.role) {
      return
    }

    onSubmit(payload)
    if (!initialData) {
      setFormData(emptyState)
    }
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" />
      </label>
      <label>
        Email
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@email.com" />
      </label>
      <label>
        Role
        <input name="role" value={formData.role} onChange={handleChange} placeholder="Admin" />
      </label>
      <div className="form-actions">
        <button type="submit">{initialData ? 'Update' : 'Add User'}</button>
        {onCancel ? (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default UserForm