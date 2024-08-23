import sequelize from "../Database/dbconfig.js";
import { DataTypes } from "sequelize";
import User from "./usermodel.js";

const profilePicture = sequelize.define("profileImg", {
    profileid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userdata', // Update this to match your actual table name
            key: 'id'
        }
    },
    profileURL: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'profileImgs' // Explicitly setting the table name
});

// Associations
User.hasOne(profilePicture, { foreignKey: 'profileid' });
profilePicture.belongsTo(User, { foreignKey: 'profileid' });

// Sync the model
sequelize.sync()
    .then(() => {
        console.log("Profile table created");
    })
    .catch((err) => {
        console.log("Something went wrong", err);
    });

export default profilePicture;















// const profilePicture = sequelize.define('profileimgs',{
//     profileid:{
//         type:DataTypes.INTEGER,
//         allowNull:true,
//         references:{
//             model:'User',
//             key:'id'
//         }
//     },
//     profileURL:{
//         type:DataTypes.STRING,
//         allowNull:true
//     }
// })
// sequelize.sync().then((result)=>{
//     console.log("profile table created succesfully")
// }).catch((err)=>{
//     console.log("SOMETHING WENT WRONG")
//     console.log(err)
// })