import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectToOpenDental = async () => {
  return await mysql.createConnection({
    host: process.env.OD_HOST,
    user: process.env.OD_USER,
    password: process.env.OD_PASS,
    database: process.env.OD_DB
  });
};

export const fetchPatients = async () => {
  const conn = await connectToOpenDental();
  const [rows] = await conn.execute('SELECT * FROM patient');
  return rows;
};

export const fetchAppointments = async () => {
  const conn = await connectToOpenDental();
  const [rows] = await conn.execute('SELECT * FROM appointment');
  return rows;
};

export const fetchProviders = async () => {
  const conn = await connectToOpenDental();
  const [rows] = await conn.execute('SELECT * FROM provider');
  return rows;
};

export const fetchProcedures = async () => {
  const conn = await connectToOpenDental();
  const [rows] = await conn.execute('SELECT * FROM procedurelog');
  return rows;
};
