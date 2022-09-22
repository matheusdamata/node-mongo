import { Request, Response } from 'express';

import User from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const addUserAction = async (req: Request, res: Response) => {
    let user = req.body;
    let interests = user.interests.split(" ");

    let newUser = new User();
    newUser.name = {
        firstName: user.firstName,
        lastName: user.lastName
    };
    newUser.email = user.email;
    newUser.age = parseInt(user.age);
    newUser.interests = interests;

    if(user) {
        await newUser.save();
        console.log("User cadastred!");
    } else {
        console.log("Unregistered user.");
    }

    res.redirect('/');
};

export const incrementAgeAction = async (req: Request, res: Response) => {
    const userId = req.params.id;

    let user = await User.findOne({ _id: userId });

    if(user) {
        if(user.age < 50) {
            user.age++;
            await user.save();
        } else {
            console.log("User has reached the age limit!");
        }
    } else {
        console.log("User not found.");
    }

    res.redirect('/');
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};