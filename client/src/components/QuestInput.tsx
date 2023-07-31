import { addQuest, QUEST_API } from '../features/quest';
import { post } from 'superagent'; // get, put, del
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import '../styles.css';

export const QuestInput = () => {
    const [inputQuestName, setInputQuestName] = useState("");
    const [inputQuestDescription, setInputQuestDescription] = useState("");
    const [inputError, setInputError] = useState(false);
    const [backendError, setBackendError] = useState(false);
    const dispatch = useDispatch();

    const createQuest = (name: string, description: string) => {
        // Save quest and use id provided by the database as key for each grid element
        saveQuest(name, description)
        .then(id => {
            if (id) {
                console.log('id of newly created quest: ' + id + ', dispatching quest creation in store');
                dispatch(addQuest({ id: id, name: name, description: description }));
            }
        })
        .catch(error => {
            console.log('Could not save quest in database: ' + error);
            setBackendError(true);
        });
    }

    const saveQuest = async (name: string, description: string) => {
        // Reset previous errors
        setInputError(false);
        setBackendError(false);

        // Check for input
        if (!name || !description) {
            console.log('Invalid input to create a new quest');
            setInputError(true);
            return false;
        }

        // Save quest in database and get the id back
        try {
            const response = await post(QUEST_API).send({ name: name, description: description });
            return response.body.id;
        } catch (error) {
            console.error('Could not save quest in database: ' + error);
            setBackendError(true);
            return false;
        }
    }

    return(
        <>
            <p className='sub-title'>Daily Quest Manager</p>
            <input
                type="text"
                id ="input-quest-name"
                value={inputQuestName}
                onChange={event => setInputQuestName(event.target.value)}
                placeholder='Quest name'
            />
            <input
                type="text"
                id ="input-quest-description"
                value={inputQuestDescription}
                onChange={event => setInputQuestDescription(event.target.value)}
                placeholder='Quest description'
            />
            <button className="button" type="button" onClick={() => createQuest(inputQuestName, inputQuestDescription)}>Add Quest</button>
            { inputError ? <p className="input-error">Please provide a name and a description before creating a Quest.</p> : <p></p> }
            { backendError ? <p className="backend-error">Backend error, please try again later.</p> : <p></p>}
        </>
    )
}