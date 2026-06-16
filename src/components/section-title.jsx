import clsx from "clsx";

const Title = (props) => {
  return (
    <h2
      className={clsx("font-clrs fs-700 title", props.center && "text-center")}
    >
      {props.title}
    </h2>
  );
};

export default Title;
