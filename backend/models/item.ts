'use strict';

import { Model } from 'sequelize';

interface itemAttributes {
  id: string;
  name: string;
  userId: number;
  price: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Item extends Model<itemAttributes> 
  implements itemAttributes {
    id!: string;
    userId!: number;
    name!: string;
    price!: number;
    static associate(models: any) {
      Item.belongsTo(models.User)
    }
  };
  Item.init({
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
