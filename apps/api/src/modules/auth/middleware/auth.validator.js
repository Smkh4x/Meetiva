import { ZodError } from "zod";

const auth_validate = (shema) => {
    return async (req, res, next) => {
        try {
            const data = await shema.parseAsync(req.body);
            req.body = data
            
        } catch (err) {
            if(err instanceof ZodError) return res.status(400).json({
                success: false,
                messsage: "validation failed",
                error_in: err.issues
            });
            res.status(500).json({
                message: "problem in server"
            })
        }
        next()
    }
}
export default auth_validate