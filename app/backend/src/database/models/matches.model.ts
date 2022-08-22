import { Model, STRING, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teams.model';

class Matches extends Model {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: { id?: number, teamName?: string };
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: STRING,
  },
  homeTeamGoals: {
    type: STRING,
  },
  awayTeam: {
    type: STRING,
  },
  awayTeamGoals: {
    type: STRING,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
