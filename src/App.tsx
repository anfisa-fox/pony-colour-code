import { useGameSession } from "./game/useGameSession";
import { GameScreen } from "./screens/GameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { StartScreen } from "./screens/StartScreen";

function App() {
  const { state, dispatch, actions } = useGameSession();

  if (state.phase === "start") {
    return (
      <StartScreen
        initialMode={state.gameMode}
        onStart={(mode) => dispatch(actions.startGame(mode))}
      />
    );
  }

  if (state.phase === "playing") {
    return <GameScreen state={state} dispatch={dispatch} actions={actions} />;
  }

  return (
    <ResultScreen
      state={state}
      onNewGame={() => dispatch(actions.returnToStart())}
    />
  );
}

export default App;
