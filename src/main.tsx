import { createRoot } from 'react-dom/client'
import './index.css'
import Tree from './components/TreeWrapper'

createRoot(document.getElementById('root')!).render(
    <Tree />
)
