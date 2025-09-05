import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'
import { ClientInformation } from './08-use-suspense/ClientInformation'
// import { InstagromApp } from './07-useOptimistic/InstagromApp'
// import { MemoCounter } from './06-memos/MemoCounter'
// import { MemoHook } from './06-memos/MemoHook'
// import { ScrambleWords } from './05-useReducer/ScrambleWords'
// import { TasksApp } from './05-useReducer/TaskApp'
// import { FocusScreen } from './04-useRef/FocusScreen'
// import { PokemonPage } from './03-examples/PokemonPage'
// import { TrafficLightWithHook } from './02-useEffect/TrafficLightWithHook'
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect'
// import { TrafficLight } from './01-useState/TrafficLight'
// import { HooksApp } from './HooksApp'
import { getUserAction } from './08-use-suspense/api/get-user-action';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}
    <Suspense fallback={<div>Loading...</div>}>
      <ClientInformation getUser={getUserAction(521)} />
    </Suspense>
  </StrictMode>,
)
