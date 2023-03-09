import Card from "../../../components/Card/Card";
import classes from "./Details.module.css";

const Details = (props) => {
  return (
    <Card className={classes.modal}>
      <section className={classes["weather-details-page"]}>
        <div>
          <h3 className={classes.city}>
            {props.city},{props.country}
          </h3>
        </div>
        <div>
          <img src={props.icon} alt='weathericon' />
          <p>{` ${props.formattedDate.day}, ${props.formattedDate.month} ${props.formattedDate.date}`}</p>
        </div>
        <div className={classes["weather-details"]}>
          <p>{props.details.description}</p>
          <p>{`Min Temp: ${props.details.minTemp}°C`}</p>
          <p>{`Max Temp: ${props.details.maxTemp}°C`}</p>
          <p>{`Humidity: ${props.details.humidity}`}</p>
        </div>
      </section>
    </Card>
  );
};

export default Details;
