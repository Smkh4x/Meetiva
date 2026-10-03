import interest_services from './interest.service.js'

class interest_class {

get_interest = async(req, res) => {
    try {
        const interests = await interest_services.get_interest();
        
        return res.status(200).json({
            success: true,
            data: interests
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get interests",
        })   
    }  
}

}

export default new interest_class