import { ProviderModel as PM, } from '../../models/providerModel'
import { ProductModel } from '../../models/ProductModel'
import { ModelStatic, Sequelize, Model, DataTypes } from 'sequelize'
import { productSchemaModel, createProductsTable } from './productTable'
import { PurchasesModel, createPurchasesTable } from './PurchasesTable'


export type providerSchemaModel = Model<PM>

export interface providerInterface {
    Schema: ModelStatic<providerSchemaModel>,
    Insert: (newProvider: Omit<PM, "companyID">) => Promise<PM>,
    getProvidersProducts: (companyID: string) => Promise<productSchemaModel[]>,
    getProvidersPurchases: (companyID: string) => Promise<PurchasesModel[]>,
    delete: (companyID: string) => Promise<boolean>

}

export async function createProviderTable(sequelize: Sequelize): Promise<providerInterface>{

    const providerTable = sequelize.define<providerSchemaModel>('providers',{
        companyID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        }, 
        name: {
            type: DataTypes.TEXT,
            allowNull: false                
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false                
        }, 
        phone: {
            type: DataTypes.NUMBER,
            allowNull: false                
        }, 

    }, {
        schema: "electronicStoreManagment",
        createdAt: false

    })

    await providerTable.sync()

    console.log("providers Table created")

    return {
        Schema: providerTable,

        async Insert(newProvider){
            const result = await providerTable.create(newProvider as PM)
            return result.toJSON();
        },

        async getProvidersProducts(companyID){
            try {
              const products = await createProductsTable["Schema"].findAll({
                where: {
                    companyID: companyID
                }
              });
              return products;
            } catch (error) {
              console.log(error);
              throw error;
            }
        },
        
        async getProvidersPurchases(companyID){
            try {
                const products = await createProductsTable["Schema"].findAll({
                    where: {
                        companyID: companyID
                    }
                });
                  
                const purchases = await createPurchasesTable["Schema"].findAll({
                    where: {
                        name: products.name
                    }
                });
                return purchases;
            } catch (error) {
                console.log(error)
                throw error;
            }
        },
        
        async delete(companyID){
            const result = await providerTable.destroy({
                cascade: true,
                where: {
                    companyID: companyID
                }
            })
            return result === 1
        },
    }

}
