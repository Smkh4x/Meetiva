import Interest from "./interest.model";

const Interest_user = async(interests_req_body) => {

    // console.log("interest: ", interest_req_body);

    const interests = await Interest.findAll({
        where: {
            id: interests_req_body.user_interests
        },
        attributes: ["id"]
    });
    if(interests.length !== interests_req_body.user_interests.length){

        throw new Error("Invalid interests")
    }

    return true;

}
export default Interest_user