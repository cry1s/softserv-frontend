import { FC } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

interface IBreadcrumps {
  name?: string;
  path?: [{name: string, path: string}]
}

const Breadcrumbs: FC<IBreadcrumps> = (props) => {
  const { name } = props;

  return (
    <Breadcrumb
      listProps={{
        className: "m-0 d-flex align-items-center breadcrump_ol",
      }}
    >
      <Breadcrumb.Item
        linkAs={Link}
        linkProps={{ to: "/" }}
        className="breadcrump"
      >
        Каталог
      </Breadcrumb.Item>
      {props.path && props.path.map(p =>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: p.path }} className="breadcrump active">
          {p.name}
        </Breadcrumb.Item>
      )}
      <Breadcrumb.Item active className="breadcrump active">
        {name}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
