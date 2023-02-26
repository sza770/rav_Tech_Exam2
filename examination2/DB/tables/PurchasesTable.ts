import { purchasesModel as PUM, } from '../../models/purchasesModel'
import { productInterface } from './productTable'
import { clientInterface } from './clientTable'
import { ModelStatic, Sequelize, Model, DataTypes } from 'sequelize'


export type PurchasesModel = Model<PUM>


export interface purchaseInterface {
    Schema: ModelStatic<PurchasesModel>,
    Insert: (clientID: string, productID: string, price: number) => Promise<PUM>,
    
}

export async function createPurchasesTable(sequelize: Sequelize, client: clientInterface["Schema"], product: productInterface["Schema"]):
Promise<purchaseInterface>{

    const PurchasesTable = sequelize.define<PurchasesModel>('purchases',{
        price: {
            type: DataTypes.FLOAT,
        }, 
        
    } as any, {
        schema: "electronicStoreManagment",
        createdAt: false

    })

    client.belongsToMany(product, { through: PurchasesTable });
    product.belongsToMany(client, { through: PurchasesTable });

    await PurchasesTable.sync()

    console.log("Clients Purchases Table created")

    return {
        Schema: PurchasesTable,
        async Insert (clientID: string, productID: string, price: number){
            const result = await PurchasesTable.create({
                clientID: clientID,
                productID: productID,
                price: price
            })
            return result.toJSON(); 
        }

    }
}
