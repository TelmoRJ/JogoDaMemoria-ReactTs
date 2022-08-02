import { useRef, useState } from "react";
import { duplicateRegenerateArray } from "../../utils/card-utils";
import { Card, CardProps } from "../Card";
import "./styles.css";

export interface GridProps {
  cards: CardProps[];
}

export function Grid({ cards }: GridProps) {
  const [stateCards, setStateCards] = useState(duplicateRegenerateArray(cards));

  const first = useRef<CardProps | null>(null);
  const second = useRef<CardProps | null>(null);
  const unflip = useRef<boolean>(false);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const handleReset = () => {
    setStateCards(duplicateRegenerateArray(cards))
    first.current = null;
    second.current = null;
    unflip.current = false;
    setMatches(0);
    setMoves(0);
  }

  const handleClick = (id: string) => {
    const newStateCards = stateCards.map((card) => {
      if (card.id !== id) return card;

      if (card.flipped) return card;

      if (unflip.current && first.current && second.current) {
        first.current.flipped = false;
        second.current.flipped = false;
        first.current = null;
        second.current = null;
        unflip.current = false;
      }

      card.flipped = true;

      if (first.current === null) {
        first.current = card;
      } else if (second.current === null) {
        second.current = card;
      }

      if (first.current && second.current) {
        if (first.current.back === second.current.back) {
          first.current = null;
          second.current = null;
          setMatches((matches) => matches + 1);
        } else {
          unflip.current = true;
        }
        setMoves((moves) => moves + 1);
      }
      return card;
    });
    setStateCards(newStateCards);
  };

  return (
    <>
      <div className="text">
        <h1>Memory Game</h1>
        <p>
          Moves: {moves} | Matches: {matches} | <button onClick={handleReset}>Reset</button>
        </p>
      </div>
      <div className="grid">
        {stateCards.map((card) => (
          <Card
            back={card.back}
            id={card.id}
            key={card.id}
            flipped={card.flipped}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
}
