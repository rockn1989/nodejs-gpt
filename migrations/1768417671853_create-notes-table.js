exports.up = (pgm) => {
	pgm.createExtension('uuid-ossp', { ifNotExists: true });

	pgm.createTable('notes', {
		id: {
			type: 'uuid',
			primaryKey: true,
			default: pgm.func('uuid_generate_v4()'),
		},
		title: { type: 'text', notNull: true },
		content: { type: 'text', notNull: true },

		created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
		updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
	});

	pgm.createIndex('notes', 'created_at');
};

exports.down = (pgm) => {
	pgm.dropTable('notes');
};
