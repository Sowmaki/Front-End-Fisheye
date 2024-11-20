export const options = {
  popularity: {
    value: 'popularity',
    text: 'Popularité',
    id: 'option-popularite',
    sort: (a, b) => b.likes - a.likes,
  },
  date: {
    value: 'date',
    text: 'Date',
    id: 'option-date',
    sort: (a, b) => new Date(b.date) - new Date(a.date),
  },
  title: {
    value: 'title',
    text: 'Titre',
    id: 'option-titre',
    sort: (a, b) => a.title.localeCompare(b.title),
  }
};