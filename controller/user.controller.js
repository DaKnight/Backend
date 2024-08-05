import users from '../models/user.modal.js'
import  bcrypt from 'bcrypt';

const createUser = (req, res) => {
    const {name, email, contact, password, role, status} = req.body;
    const hashedPassword = hashPassword(password);
    users.create({name, email, contact, password:hashedPassword, role, status}, (err, results) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({message: 'User created successfully.', id: results.insertId });
    });
};

const findAllUser = (req, res) => {
    users.findAllUsers((err, results) => {
        if(err){
            return res.status(500).json({error: err.message, message: 'hi'});
        }
        if(!results){
            return res.status(404).json({message: 'User not found.'});
        }
        res.status(200).render('body/view-users', {data: results});
    });
};

const findUser = (req, res) => {
    const {email} = req.params;
    users.findByEmail({email}, (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(!results){
            return res.status(404).json({message: 'User not found.'});
        }
        res.status(200).json({data: results});
    });
};

const updateUser = (req, res) => {
    const {name, password} = req.body;
    const{email} =  req.params;
    const hashedPassword = hashPassword(password)
    users.update({name, password: hashedPassword, email}, (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.affectedRows === 0) {
            return res.status(404).json({error: 'User not found.'});
        }
        res.status(200).json({message: 'User udpated successfully.'});
    });
};

const deleteUser = (req, res) => {
    const {email} = req.params;
    users.delete({email},(err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.affectedRows === 0){
            return res.status(404).json({error: 'User not found.'});
        }
        res.status(200).json({message: 'User deleted successfully.'});
    });
    
};

const userController = {
    createUser,
    findAllUser,
    findUser,
    updateUser,
    deleteUser
};


export default userController;


function hashPassword(password){
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}