import { setQuests, editQuest, deleteQuest, Quest, QUEST_API } from '../features/quest';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { get, put, del } from 'superagent';
import '../styles.css';

export const QuestViewer = () => {
    const quests = useSelector((state: RootState) => state.quest.value); // .map(element => element)
    const dispatch = useDispatch();

    const modifyQuest = async (id: string | undefined, newName: string, newDesc: string) => {
        console.log('Editing a quest');

        if (!id) {
            console.error('Could not edit quest: quest has invalid id');
            return;
        }

        const editedQuest: Quest = { id: id, name: newName, description: newDesc };

        console.log('DEBUG : ' + JSON.stringify(editedQuest));

        try {
            await put(QUEST_API).send(editedQuest);
            dispatch(editQuest(editedQuest));
        } catch (error) {
            console.error('Could not edit quest in database: ' + error);
            return false;
        }
    }

    const abandonQuest = async (id: string | undefined) => {
        console.log('Abandoning quest: ' + id);

        if (!id) {
            console.error('Could not abandon quest: quest has invalid id');
            return;
        }

        try {
            await del(QUEST_API).send({ id });
            dispatch(deleteQuest(id));
        } catch (error) {
            console.error('Could not delete quest in database: ' + error);
        }
    }

    useEffect(() => {
        get(QUEST_API)
        .then(res => {
            // Build an array of Quest based on the API response
            const quests: Array<Quest> = res.body.map((quest: any) => {
                return new Quest(quest._id, quest.name, quest.description);
            });

            // Send the array of Quest to the store as a JSON string
            dispatch(setQuests(JSON.stringify(quests)));
        })
        .catch(err => {
          console.error('Could not get quests from database: ' + err);
        });
      }, []
    );

    return(
        <>
            <div className="grid-container">
                {quests.map(quest => {
                    return <div className="grid-item" key={quest.id}>
                            <label>{quest.name}<br/></label>
                            <label>{quest.description}<br/></label>
                            <button className="button quest-button" type="button" onClick={() => modifyQuest(quest.id, "editedName", "editedDesc")}>Edit</button>
                            <button className="button quest-button" type="button" onClick={() => abandonQuest(quest.id)}>Abandon</button>
                        </div>
                    
                })}
            </div>
            <p className="placeholder">You don't have any quests yet</p>
        </>
    )
}