import { useMemo, useState } from 'react'
import GridTable from './components/GridTable'
import UserForm from './components/UserForm'
import { deleteUser, getUsers, saveUsers } from './services/userStorage'

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100]

function App() {
  const [rows, setRows] = useState(getUsers)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [editingRow, setEditingRow] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const filteredRows = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      return rows
    }

    return rows.filter((row) =>
      [row.name, row.email, row.role].some((field) =>
        field.toLowerCase().includes(term),
      ),
    )
  }, [rows, query])

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const safePage = Math.min(currentPage, pageCount)
  const start = (safePage - 1) * pageSize
  const visibleRows = filteredRows.slice(start, start + pageSize)

  const upsertRow = (payload) => {
    let updated

    if (payload.id) {
      updated = rows.map((row) => (row.id === payload.id ? payload : row))
    } else {
      const nextId = rows.length
        ? Math.max(...rows.map((row) => Number(row.id))) + 1
        : 1
      updated = [...rows, { ...payload, id: nextId }]
    }

    setRows(updated)
    saveUsers(updated)
    setEditingRow(null)
    setIsFormOpen(false)
  }

  const removeRow = (id) => {
    const updated = deleteUser(rows, id)
    setRows(updated)
    saveUsers(updated)
    setCurrentPage((prev) => Math.min(prev, Math.max(1, Math.ceil(updated.length / pageSize))))
  }

  const openCreateDialog = () => {
    setEditingRow(null)
    setIsFormOpen(true)
  }

  const openEditDialog = (row) => {
    setEditingRow(row)
    setIsFormOpen(true)
  }

  const closeDialog = () => {
    setEditingRow(null)
    setIsFormOpen(false)
  }

  return (
    <div className="page-shell">
      <div className="shape shape-one" />
      <div className="shape shape-two" />

      <main className="app-card">
        <header className="app-header">
          <div>
            <p className="app-header-kicker">User Management App</p>
            <h2>GRID CRUD ReactJS</h2>
          </div>
          <div className="app-header-meta" aria-label="User stats">
            <span>Total: {rows.length}</span>
            <span>Visible: {filteredRows.length}</span>
          </div>
        </header>

        <header className="hero">
          <p className="eyebrow">React + Vite</p>
          <h1>GRID CRUD Dashboard</h1>
          <p className="hero-copy">
            Manage users with search, pagination, and local storage persistence.
          </p>
        </header>

        <section className="panel">
          <div className="toolbar">
            <h2>Users Grid</h2>
            <div className="toolbar-actions">
              <input
                className="search-input"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search by name, email, role..."
                aria-label="Search users"
              />
              <select
                className="page-size-select"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value))
                  setCurrentPage(1)
                }}
                aria-label="Rows per page"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>
              <button type="button" onClick={openCreateDialog}>
                Add User
              </button>
            </div>
          </div>

          <GridTable rows={visibleRows} onEdit={openEditDialog} onDelete={removeRow} />

          <div className="pagination">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            <span>
              Page {safePage} of {pageCount}
            </span>
            <button
              type="button"
              disabled={safePage === pageCount}
              onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
            >
              Next
            </button>
          </div>
        </section>

        {isFormOpen ? (
          <div className="modal-overlay" role="presentation" onClick={closeDialog}>
            <section
              className="modal-card"
              role="dialog"
              aria-modal="true"
              aria-label={editingRow ? 'Edit user dialog' : 'Add user dialog'}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{editingRow ? 'Edit User' : 'Add User'}</h2>
                <button type="button" className="ghost" onClick={closeDialog}>
                  Close
                </button>
              </div>
              <UserForm
                key={editingRow?.id ?? 'create'}
                initialData={editingRow}
                onSubmit={upsertRow}
                onCancel={closeDialog}
              />
            </section>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default App