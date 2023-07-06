import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import {schema} from '@ioc:Adonis/Core/Validator'


export default class ProductsController {
    public async insertproduct({request}:HttpContextContract)
    { 
        const insertSchema = schema.create({
            
            productId: schema.number(),
            productName: schema.string(),
            price: schema.number(),
            size: schema.string()
        
        })
        const payload = await request.validate({schema: insertSchema})
        const product = await Product.create({
            productId:payload.productId,
            productName:payload.productName,
            price:payload.price,
            size:payload.size})
        return product;
        
    }

    public async displayproduct({}:HttpContextContract)
    {
        const display = await Product.all()
        return display;
    }

    // public async updateproducts({request,params}:HttpContextContract)
    // {
    //     try{
    //     const updateSchema = schema.create({
            
    //         empId: schema.number(),
    //         empName: schema.string(),
    //         deptId: schema.number(),

    //     })
    //     const payload = await request.validate({schema: updateSchema})
    //     const employee = await Employee.findOrFail(params.id)
    //     employee.empId = payload.empId,
    //     employee.empName = payload.empName,
    //     employee.deptId = payload.deptId
    //     await employee.save()
    //     return "Updated successfully"
    // }
    // catch(err)
    // {
    //     return " Updation Failed"
    // }
    // }
 
    public async deleteproduct({params}:HttpContextContract)
    {
        const product = await Product.findBy('id',params.id)
        if(product == null){
            return "No ID Found!!"
        }else{
        await product.delete()
        return "Deleted Successfully"
        }
    }

    public async searchproduct({ request }: HttpContextContract) {
        const searchTerm = request.input('term');
        const searchTermInt = parseInt(searchTerm);
        const product = await Product.query()
          .where('product_name', 'like', `%${searchTerm}%`)
          .orWhere('size','like', `%${searchTerm}%`)
          .select('*')
          .exec();
      
        return product;
      }
     

}
