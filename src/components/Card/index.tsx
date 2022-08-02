import "./styles.css";

export interface CardProps {
  id: string;
  back: string;
  flipped?: boolean;
  handleClick?: (id: string) => void;
}

export function Card({ id, back, handleClick, flipped }: CardProps) {

  const handleClickFn = () => {
    if(handleClick) {
      flipped = true
      handleClick(id)
    }
  }

  return (
    <div className="card">
      <div
        onClick={() => handleClickFn()}
        className={
          flipped ? "card__content card__content--flipped" : "card__content"
        }
      >
        <div className="card__face card__face--front">?</div>
        <div className="card__face card__face--back">{back}</div>
      </div>
    </div>
  );
}
