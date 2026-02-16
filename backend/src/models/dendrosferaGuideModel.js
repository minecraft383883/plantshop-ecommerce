const db = require('../config/database');

const DendrosferaGuideModel = {
  async getAll() {
    const { rows } = await db.query(
      'SELECT * FROM dendrosfera_guides ORDER BY plant_type ASC'
    );
    return rows;
  },

  async getByPlantType(plantType) {
    const { rows } = await db.query(
      'SELECT * FROM dendrosfera_guides WHERE LOWER(plant_type) = LOWER($1) LIMIT 1',
      [plantType]
    );
    return rows[0] || null;
  },
};

module.exports = DendrosferaGuideModel;
