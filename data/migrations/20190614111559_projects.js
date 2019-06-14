exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(table) {
      table.increments();
  
      table.string('name', 128).notNullable();
      table.text('description').notNullable();
      table.boolean('completed').defaultTo(false);
    })

    .createTable('actions', function(table) {
      table.increments(id).primary();
  
      table
        .integer('id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  
      table.string('description', 128).notNullable();
      table.text('notes').notNullable();
      table.boolean('completed').defaultTo(false);
    });
};

  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects')
    .dropTableIfExists('actions');
  };
  