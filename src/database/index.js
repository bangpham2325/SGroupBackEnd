import knex from 'knex';
import config from '../../knexfile';
import {NODE_ENV} from '../env';

export const knexConnection = knex(config[NODE_ENV]);

export const getTransaction = () => knexConnection.transaction();

export const authenDatabaseConnection = async () => {
  try {
    await knexConnection.raw('SELECT 1');
    console.log('Database connected');
  } catch (error) {
    console.log('Database not connected',error);
  }
};
