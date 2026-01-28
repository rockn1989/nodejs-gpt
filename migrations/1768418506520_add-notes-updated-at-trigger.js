exports.up = (pgm) => {
	// Функция: всегда ставит updated_at = now()
	pgm.createFunction(
		'set_updated_at',
		[],
		{
			returns: 'trigger',
			language: 'plpgsql',
		},
		`
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    `,
	);

	// Триггер на таблицу notes
	pgm.createTrigger('notes', 'trg_notes_set_updated_at', {
		when: 'BEFORE',
		operation: 'UPDATE',
		level: 'ROW',
		function: 'set_updated_at',
	});
};

exports.down = (pgm) => {
	pgm.dropTrigger('notes', 'trg_notes_set_updated_at', { ifExists: true });
	pgm.dropFunction('set_updated_at', [], { ifExists: true });
};
