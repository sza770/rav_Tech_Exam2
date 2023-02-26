import { ClientModel as CM } from '../../models/clientModel'
import { Sequelize, Model, DataTypes, ModelStatic } from 'sequelize'


export type clientSchemaModel = Model<CM>

export interface clientInterface {
    Schema: ModelStatic<clientSchemaModel>
    Insert: (newClient: Omit<clientSchemaModel, "clientID">) => Promise<CM>,
    delete: (clientID: string) => Promise<boolean>

}

export async function createClientsTable(sequelize: Sequelize): Promise<clientInterface> {
    
    const clientTable = sequelize.define<clientSchemaModel>('clients',{
        clientID: {
            type: DataTypes.TEXT,
            primaryKey: true,
            defaultValue: DataTypes.TEXT
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
            type: DataTypes.TEXT,
            allowNull: false                
        }

    }, {
        schema: "electronicStoreManagment",
        createdAt: false
    })

    await clientTable.sync()
    console.log("Clients Table created")

    return {
        Schema: clientTable,
        async Insert(newClient){
            const result = await clientTable.create(newClient)
            return result.toJSON();
        },
        async delete(clientID){
            const result = await clientTable.destroy({
                cascade: true,
                where: {
                    clientID: clientID
                }
            })
            return result === 1
        },
    }
    
}
