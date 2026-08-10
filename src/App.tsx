import { useGameSession } from "./game/useGameSession";
import { GameScreen } from "./screens/GameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { StartScreen } from "./screens/StartScreen";

function App() {
  const { state, dispatch, actions } = useGameSession();

  if (state.phase === "start") {
    return <StartScreen onStart={() => dispatch(actions.startGame())} />;
  }

  if (state.phase === "playing") {
    return <GameScreen state={state} dispatch={dispatch} actions={actions} />;
  }

  return (
    <ResultScreen
      state={state}
      onNewGame={() => dispatch(actions.newGame())}
    />
  );
}

export default App;
