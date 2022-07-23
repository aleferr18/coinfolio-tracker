async function handler(req,res) {

    const APY_KEY = process.env.NEXT_PUBLIC_FIREBASE_DB;
    
    let url = (req.body.type === 'login') ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APY_KEY}` : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APY_KEY}`;

    try{
    const sendUser = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
                email: req.body.email,
                password: req.body.password,
                returnSecureToken: true
            }),
        headers: {
                "Content-Type": "application/json"
        }
    })

    const response = await sendUser.json();

    res.json(response);
    } catch (e){
        console.log(e);
    }

}

export default handler;