import { Fragment, useState } from 'react'

function GridTable({ rows, onEdit, onDelete }) {
  const [expandedRowId, setExpandedRowId] = useState(null)

  if (!rows.length) {
    return <p className="empty-state">No users found for this filter.</p>
  }

  const toggleDetail = (id) => {
    setExpandedRowId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Expand</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isExpanded = expandedRowId === row.id

            return (
              <Fragment key={row.id}>
                <tr key={row.id} className={isExpanded ? 'master-row expanded' : 'master-row'}>
                  <td>
                    <button
                      type="button"
                      className="detail-toggle"
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? `Collapse details for ${row.name}` : `Expand details for ${row.name}`}
                      onClick={() => toggleDetail(row.id)}
                    >
                      {isExpanded ? '-' : '+'}
                    </button>
                  </td>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                  <td className="actions">
                    <button type="button" className="ghost" onClick={() => onEdit(row)}>
                      Edit
                    </button>
                    <button type="button" className="danger" onClick={() => onDelete(row.id)}>
                      Delete
                    </button>
                  </td>
                </tr>

                {isExpanded ? (
                  <tr className="detail-row">
                    <td colSpan={6}>
                      <div className="detail-card">
                        <p>
                          <strong>Profile:</strong> {row.name} is assigned as <strong>{row.role}</strong>.
                        </p>
                        <p>
                          <strong>Contact:</strong> {row.email}
                        </p>
                        <p>
                          <strong>Reference ID:</strong> USER-{String(row.id).padStart(4, '0')}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GridTable