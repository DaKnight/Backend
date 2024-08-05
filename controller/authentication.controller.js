import authentication from "../models/authentication.model.js";
import bcrypt from 'bcrypt';

const authenticate = (req, res) => {
    const { email, password } = req.body;
    console.log('email:  ',email);
    console.log('password:  ',password);
    authentication.validate({email}, (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(!results){
            return res.status(404).json({ message: 'User not found.'});
        }
        const oldPassword = results.password;
        if(bcrypt.compareSync(password, oldPassword)){
            console.log('User found.');
            res.status(200).json({message: 'User found.'});
        }
        else{
            console.log('User Not found.');
            res.status(401).json({message: 'Wrong Password.'});
        }
    });
};

export default authenticate;
