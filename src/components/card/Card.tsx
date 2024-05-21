import "./Card.scss";

export function Card({name, bodyInfo, bodyExplaining, status, update, children, isDangerStatus }: any) {
    return (
    <div className={`card ${isDangerStatus? '--danger-status': ''}`}>
        <div className="card__title">
          <span className="card__name" >{name}</span>
          <span className="card__update"> {update}</span>
        </div>

        <div className="card__body">
          <span className="card__info">{bodyInfo}</span>
          <span className="card__explaining">{bodyExplaining}</span>

          <span className="card__status">{status}</span>

          <div className="card__links">{children}</div>
        </div>
    </div>)
}

