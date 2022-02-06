// Dependencies
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Box = (props) => {
  return (
    <Card className={`${props.bgColor} ${props.textColor}`}>
      <Card.Body className="text-center">
        <h1 className="mb-3">
          <i className={props.icon}></i>
        </h1>
        <h3 className="card-title mb-3">{props.title}</h3>
        <p className="card-text">{props.bodyText}</p>
        <Link to={props.goTo} className={`btn ${props.buttonColor}`}>
          {props.buttonText}
        </Link>
      </Card.Body>
    </Card>
  )
}
