const db = require('../config/database');

const SpeciesMappingModel = {
  async getByScientificName(scientificName) {
    const { rows } = await db.query(
      'SELECT * FROM species_mappings WHERE LOWER(scientific_name) = LOWER($1) LIMIT 1',
      [scientificName]
    );
    return rows[0] || null;
  },

  async createOrUpdate({ scientific_name, common_name, plant_type }) {
    const { rows } = await db.query(
      `
      INSERT INTO species_mappings (scientific_name, common_name, plant_type)
      VALUES ($1, $2, $3)
      ON CONFLICT (LOWER(scientific_name))
      DO UPDATE SET common_name = EXCLUDED.common_name,
                    plant_type = EXCLUDED.plant_type
      RETURNING *;
      `,
      [scientific_name, common_name, plant_type]
    );
    return rows[0];
  },
};

module.exports = SpeciesMappingModel;
