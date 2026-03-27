const STORAGE_KEY = 'grid-crud-users-v2'

const firstNames = [
  'Amina',
  'Jordan',
  'Rafael',
  'Mia',
  'Owen',
  'Lina',
  'Noah',
  'Ella',
  'Isaac',
  'Zara',
]

const lastNames = [
  'Clark',
  'Lee',
  'Ortiz',
  'Evans',
  'Patel',
  'Hassan',
  'Stone',
  'Khan',
  'Bennett',
  'Wright',
]

const roles = ['Admin', 'Editor', 'Reviewer', 'Operator', 'Analyst', 'Support']

const seedData = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1
  const firstName = firstNames[index % firstNames.length]
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length]
  const role = roles[index % roles.length]
  const name = `${firstName} ${lastName}`

  return {
    id,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@acme.dev`,
    role,
  }
})

export function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData))
    return seedData
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData))
    return seedData
  }
}

export function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function deleteUser(users, id) {
  return users.filter((user) => user.id !== id)
}