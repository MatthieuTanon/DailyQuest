import { Quest, IQuest } from '../models/quest';
import type { RequestHandler } from 'express';

export const createQuest: RequestHandler = async (req, res, _next) => {
    console.log('\nReceiving POST request');
    console.log('Saving new quest in database');
    try {
        const quest = new Quest({ name: req.body.name, description: req.body.description });
        await quest.save();
        console.log('Returning database quest id = ' + quest.id);
        res.status(201).json({ id: quest.id })
    } catch (error) {
        console.error('Quest could not save quest in database');
        console.error(error);
        res.status(400).json(error);
    }
}

export const getQuests: RequestHandler = async (_req, res, _next) => {
    console.log('\nReceiving GET request');
    try {
        const quests: IQuest[] = await Quest.find();
        console.log('Fetching all quests in database');
        res.status(200).json(quests);
    } catch (error) {
        console.error('Could not get quest from database');
        console.error(error);
        res.status(400).json(error);
    }
}

export const updateQuest: RequestHandler = async (req, res, _next) => {
    console.log('\nReceiving PUT request');
    console.log('PUT request body = ' + JSON.stringify(req.body));

    try {
        console.log('Updating quest ' + req.body.id + ' in database');
        await Quest.findByIdAndUpdate(req.body.id, { name: req.body.name, description: req.body.description });
        res.status(200).json({ message: 'Quest successfully updated'});
    } catch (error) {
        console.error('Could not find and update quest in database');
        console.error(error);
        res.status(400).json(error);
    }
};

export const deleteQuest: RequestHandler = async (req, res, _next) => {
    console.log('\n Receiving DELETE request');
    console.log('DELETE request body = ' + JSON.stringify(req.body));

    try {
        console.log('Deleting quest in database');
        await Quest.deleteOne({ _id: req.body.id });
        res.status(200).json({ message: 'Quest successfully deleted' });
    } catch (error) {
        console.error('Could not delete quest in database');
        console.error(error);
        res.status(400).json(error);
    }
}