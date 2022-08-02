import { Grid } from "../../components/Grid";
import { cards } from "../../data/cards";
import "./styles.css";

export function App() {
  return (
    <div className="App">
      <Grid cards={cards} />
    </div>
  );
}
