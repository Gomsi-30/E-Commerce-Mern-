
export const giveToken = (newUser,statusCode,res)=>{
    let jwt = newUser.jwtToken();

    let options = {
        maxAge : Date.now(
            Date.now() + 1000
        ),
        httpOnly: true,
    }

    res.status(statusCode).cookie("token", jwt, options).json({
        success: true,
        newUser,
        jwt,
      });
}