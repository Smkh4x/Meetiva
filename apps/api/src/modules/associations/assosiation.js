import Users from "../users/user.model.js";
import Interest from "../interests/interest.model.js";
import Assosiation_User_And_Interests from "./assosiation.model.js";


Users.belongsToMany(Interest, {
    through: Assosiation_User_And_Interests,
    foreignKey: "userId",
    otherKey: "interestId"
})

Interest.belongsToMany(Users, {
  through: Assosiation_User_And_Interests,
  foreignKey: "interestId",
  otherKey: "userId",
});



