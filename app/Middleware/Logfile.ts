import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

  async function convertTableToCsv(tableData, filePath) {
  const csvWriter = createCsvWriter({
    path: filePath,
    header:[{ id: 'route', title: 'Route' },
    { id: 'ipAddress', title: 'IP Address' },]
  });

  await csvWriter.writeRecords(tableData);
}

export default class LogMiddleware {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    await next();

    const logData = {
      route: request.url(),
      ipAddress: request.ip(),
    };

    // Save log data to the database
    await Log.create(logData);

    // Retrieve the table data from the Log model or any other source
    const tableData = await Log.query().select('*');

    // Convert tableData to CSV and save to a file
    const filePath = '../output.csv';
    await convertTableToCsv(tableData, filePath);

    await Log.query().delete();
  }
}
