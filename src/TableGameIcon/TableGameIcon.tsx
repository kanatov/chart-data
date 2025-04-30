import { ReactNode } from "react";
import "./TableGameIcon.css";

interface ITableGameIcon {
  children: ReactNode;
  icon: string;
  alt: string;
}

export default function TableGameIcon({ children, icon, alt }: ITableGameIcon) {
  return (
    <figure className="table-game-icon">
      <img src={icon} alt={alt} />
      <figcaption>{children}</figcaption>
    </figure>
  );
}
