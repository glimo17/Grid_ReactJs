# GRID CRUD ReactJS

A responsive User Management dashboard built with **React 18** and **Vite**. It features a searchable, paginated data grid with full create / read / update / delete (CRUD) operations backed by browser `localStorage`.

---

## Features

- **Data Grid** – tabular view of users with expandable detail rows
- **Search** – real-time filter across name, email, and role columns
- **Pagination** – configurable page size (5 / 10 / 20 / 50 / 100 rows per page)
- **Add / Edit / Delete** users via a modal dialog form
- **LocalStorage persistence** – data survives page refreshes; 100 seed users are pre-loaded on first visit
- **Accessible** – semantic HTML, `aria-*` attributes, and keyboard-friendly controls

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI framework | [React 18](https://react.dev/) |
| Build tool | [Vite 5](https://vitejs.dev/) |
| Styling | Plain CSS (CSS custom properties) |
| Fonts | Manrope & Space Grotesk via Google Fonts |
| Persistence | Browser `localStorage` |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/glimo17/Grid_ReactJs.git
cd Grid_ReactJs

# 2. Install dependencies
npm install
```

### Running the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for production

```bash
npm run build       # outputs to dist/
npm run preview     # preview the production build locally
```

---

## Project Structure

```
Grid_ReactJs/
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # Root component – state management & layout
    ├── styles.css          # Global styles & CSS variables
    ├── components/
    │   ├── GridTable.jsx   # Paginated data table with expandable rows
    │   └── UserForm.jsx    # Add / Edit user modal form
    └── services/
        └── userStorage.js  # localStorage helpers & seed data
```

---

## Usage

| Action | How |
|--------|-----|
| **Search** | Type in the search box to filter rows by name, email, or role |
| **Change page size** | Use the dropdown next to the search box |
| **Navigate pages** | Click **Previous** / **Next** buttons |
| **Expand a row** | Click the **+** button in the first column |
| **Add a user** | Click **Add User**, fill in the form, click **Add User** to save |
| **Edit a user** | Click **Edit** on any row, update the fields, click **Update** |
| **Delete a user** | Click **Delete** on any row |

---

## License

This project is open-source and available under the [MIT License](LICENSE).
