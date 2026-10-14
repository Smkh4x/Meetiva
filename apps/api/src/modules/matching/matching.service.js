import Users from "../users/user.model.js"

class MatchingService {


    constructor() {
        this.waittingUsers = [] // here waiting users 
    }
    async startMatching (socket_id, user_id) {

        const interests = await Users.findByPk(user_id)

            if(this.waittingUsers.length === 0){
                    this.waittingUsers.push({
                    socketId: socket_id,
                    userId: user_id,
                    interests: interests.user_interests,
                    username: interests.userName
                })
                // console.log("before ======> ",this.waittingUsers)
                return null;
        }
        const check_waiting = this.waittingUsers.some((waitingUser) => waitingUser.userId === user_id)

            if(check_waiting){
                this.waittingUsers.splice(check_waiting.userId, 1)
                console.log("ana hydtk")
                    this.waittingUsers.push({
                    socketId: socket_id,
                    userId: user_id,
                    interests: interests.user_interests,
                    username: interests.userName
                })
                console.log(this.waittingUsers)
                console.log("ana 3wdt drt lk push");
                return null;
            }

         // min 2 to matched
        let matchedUser;

        matched_sersh:
        for(let i = 0; i < this.waittingUsers.length; i++){ // start loop in users waiting
            console.log("hhh")
            let count_interests = 0
            const founds = this.waittingUsers[i]

            for(let j = 0; j < founds.interests.length; j++){ 

                for(let y = 0; y < interests.user_interests.length; y++){ // lopp in user interests

                    if(founds.interests[j] == interests.user_interests[y]){ // compare user waiting with user helping
                        count_interests++ 
                    }

                }
            }
            if(count_interests >= 2){

                matchedUser = this.waittingUsers[i]
                this.waittingUsers.splice(i, 1) // here splice ( change array ) remove item 
                console.log("data",matchedUser)
                break matched_sersh; // break from all lops
            }
        }

        console.log("haya : ",matchedUser)
            if(!matchedUser){
                this.waittingUsers.push({
                socketId: socket_id,
                userId: user_id,
                interests: interests.user_interests,
                username: interests.userName
            })
            console.log("add data user in waiting because not found any one for matching")
        }
        // console.log("after =====>",this.waittingUsers)
        // console.log("9bl return => ",matchedUser)
        return matchedUser;

        
    }
}

export default MatchingService
