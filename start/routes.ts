import Route from '@ioc:Adonis/Core/Route'

Route.get('displayProduct','ProductsController.displayproduct').middleware('Logfile')
Route.get('deleteProduct/:id','ProductsController.deleteproduct').middleware('Logfile')
Route.post('insertProduct','ProductsController.insertproduct').middleware('Logfile')
Route.get('searchProduct','ProductsController.searchproduct').middleware('Logfile')
//Route.get('convertTableToCsv','Logfile.convertTableToCsv')
import LogMiddleware from '../app/Middleware/Logfile';

Route.get('/logging', async ({ request, response }) => {
  const logMiddleware = new LogMiddleware();
  await logMiddleware.handle({ request }, async () => {
    return response.send('Logging executed successfully');
  });
});
