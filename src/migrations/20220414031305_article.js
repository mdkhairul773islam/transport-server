/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('articles', (table) => {
    table.increments();
    table.string('branch', 255);
    table.date('description', 255);
    table.string('name', 255);
    // table.string('holiday', 255);
    // table.string('checkOut', 255);
    // table.string('inAt', 255);
    // table.string('outAt', 255);
    // table.string('initTime', 255);
    // table.string('exitTime', 255);
    // table.string('workingHours', 255);
    // table.string('late', 255);
    // table.string('early', 255).defaultTo('false');
    // table.string('overtime');
    // table.string('overtimepaid').defaultTo('[]');
    // table.string('meeting').defaultTo('[]');
    // table.string('checkings');
    // table.string('project_info').defaultTo('{}');
    // table.string('pause').defaultTo('false');
    // table.string('washroom').defaultTo('[]');
    // table.string('regular').defaultTo('[]');
    // table.string('prayer').defaultTo('[]');
    // table.string('lunch').defaultTo('[]');
    // table.string('mobile').defaultTo('[]');
    // table.string('extra').defaultTo('[]');
    // table.string('offlinetask').defaultTo('[]');
    // table.string('currentProject').defaultTo('');
    // table.boolean('sync').defaultTo(true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('articles');
};
