import clsx from "clsx";

const SecondaryText = (props) => {
  return (
    <span
      className={clsx(
        "secondary-clrs fs-300 secondary-text",
        props.center && "text-center"
      )}
    >
      <strong>
        <em>- {props.text}</em>
      </strong>
    </span>
  );
};

export default SecondaryText;
