const NoteService = require("../src/service/notesService");
const saveNotes = require("../src/utils/saveNotes.utils");

beforeEach(async () => {
  await saveNotes([]);
});

describe("POSITIVE: Notes service", () => {
  it("Note: create and get", async () => {
    const noteData = {
      title: "Test",
      content: "123",
    };

    const created = await NoteService.createNote(noteData);

    expect(created).toMatchObject(noteData);
    expect(created.id).toBeDefined();
    expect(created.createdAt).toBeDefined();
    expect(created.updatedAt).toBeDefined();

    const fetched = await NoteService.getNoteById(created.id);

    expect(fetched).toEqual(created);
  });
});
