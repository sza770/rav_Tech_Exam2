import { ProductModel as PM } from '../../models/productModel'
import { ModelStatic, Sequelize, Model, DataTypes } from 'sequelize'


export type productSchemaModel = Model<PM>

export interface productInterface {
    Schema: ModelStatic<productSchemaModel>
    Insert: (newProduct: Omit<productSchemaModel, "productID">) => Promise<PM>,
    delete: (clientID: string) => Promise<boolean>

}

export async function createProductsTable(sequelize: Sequelize): Promise<productInterface>{

    const productTable = sequelize.define<productSchemaModel>('products',{
        productID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        }, 
        name: {
            type: DataTypes.TEXT,
            allowNull: false                
        },
        provider: {
            type: DataTypes.TEXT,
            allowNull: false                
        }, 
        price: {
            type: DataTypes.NUMBER,
            allowNull: false                
        }, 

    }, {
        schema: "electronicStoreManagment",
        createdAt: false

    })

    await productTable.sync()

    console.log("product Table created")
    return {
        Schema: productTable,
        async Insert(newProduct){
            const result = await productTable.create(newProduct)
            return result.toJSON();
        },
        async delete(productID){
            const result = await productTable.destroy({
                cascade: true,
                where: {
                    productID: productID
                }
            })
            return result === 1
        },
    }

}
