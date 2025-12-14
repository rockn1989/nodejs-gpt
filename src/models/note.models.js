function createNote({ title, content }) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
}

function updateNote(note, data) {
  return {
    ...note,
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

module.exports = {
  createNote,
  updateNote,
};
