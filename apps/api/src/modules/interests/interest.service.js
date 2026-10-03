import Interest from "./interest.model.js";

class interest_services {

    get_interest = async () => {
        const result = await Interest.findAll()
        return result;
    }
}

export default new interest_services()