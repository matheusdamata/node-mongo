import { Request, Response } from 'express';

import { Product } from '../models/Product';
import User from '../models/User';

export const home = async (req: Request, res: Response)=>{
    let user = await User.findOne({ email: 'mona@pais.pa' });

    if(user) {
        await user.remove();
    }

    let users = await User.find({}).sort({"name.firstName": 1});

    //console.log(users);
    res.render('pages/home', {
        users
    });
};