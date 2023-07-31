import { QuestInput } from './components/QuestInput';
import { QuestViewer } from './components/QuestViewer';
import './styles.css';

function App() {

  return (
    <div className='main-container'>
      <h1 className='main-title'>Daily Quests</h1>
      <QuestInput/>
      <QuestViewer/>
    </div>
  )
}

export default App;
