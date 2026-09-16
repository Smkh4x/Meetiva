import Users from "./user.model";

const user_Service = {

    getMe: async (userId) => {
        const user = await Users.findByPk(userId);
        return user;
    }

}
export default user_Service;