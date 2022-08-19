import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Login extends Model {
  email: string;
  password: string;
  id?: number;
  username: string;
  role: string;
}

Login.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default Login;
