import clsx from "clsx";

const BlogCard = (props) => {
  return (
    <div className={clsx("blog-review grid", props.width && "col2")}>
      <div className="blog-thumb" />
      <div className="blog-copy">
        <span className="tag yellow-tag">Top tips</span>
        <h3 className="fs-500 font-clrs">{props.title}</h3>
        <p className="font-clrs">
          Simple routines, ingredient notes, and product picks for healthier
          skin.
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
