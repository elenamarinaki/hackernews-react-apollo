import "../styles/App.css"
import { LinkList } from "./LinkList"
import { CreateLink } from "./CreateLink"
import { Signup } from "./Signup"

function App() {
  return (
    <div className='App'>
      <LinkList />
      <Signup />
      <CreateLink />
    </div>
  )
}

export default App
