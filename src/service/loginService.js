import pool from "../configs/connectDB";

let handleLogin = (email, password) => {
    return new Promise( async (resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkEmail(email);
            // console.log('check exist', isExist);
            if(isExist) {
                const [rows, fields] = await pool.execute("SELECT PASSWORD FROM USER where EMAIL = ?", [email]);
                const pass_User = rows[0].PASSWORD;
                console.log('pass: ' + pass_User);
                let result = password.localeCompare(pass_User);
                //console.log(pass_User + " - " + password);
                if(result === 0)
                {
                    let getUser = await getInfoUser(email);
                    // console.log('getUser: ' + JSON.stringify(getUser))
                    userData.errCode = 3;
                    userData.message = "Login successful";
                    userData.userInfo = getUser[0].USERID;
                }
                else{
                    userData.errCode = 2;
                    userData.message = "Your password is incorrect";
                    // console.log("Your password is incorrect");
                }
            }
            else{
                userData.errCode = 1;
                userData.message = "Your email not found";
            }
            resolve(userData);
        }
        catch(e){
            reject(e);
        }
    })
}

let checkEmail = (email) => {
    return new Promise( async (resolve, reject) => {
        try{
            const [user, fields] = await pool.execute("SELECT * FROM USER where EMAIL = ?", [email]);
            if(!user.length)
            {
                resolve(false);
            }
            else{
                resolve(true);
            }
        }
        catch(e){
            reject(e);
        }
    })
}

let getInfoUser = (email) => {
    return new Promise( async (resolve, reject) => {
        try{
            let data = {};
            const [rows] = await pool.execute("SELECT * FROM USER where EMAIL = ?", [email]);
            const id_User = rows[0].USERID;
            const [user] = await pool.execute("SELECT * FROM USER where USERID = ?", [id_User]);
            
            if(!user.length)
            {
                resolve(false);
            }
            else{
                data = user;
                resolve(data);
            }
        }
        catch(e){
            reject(e);
        }
    })
}



module.exports = {
    handleLogin,
    checkEmail
}