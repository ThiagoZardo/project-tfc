import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Teams extends Model {
  id: number;
  teamName?: string;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Teams;
