import { IoCall } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

import css from "./Contact.module.css";

export default function Contact({ contact: { id, name, number }, onDelete }) {
  return (
    <>
      <div>
        <p className={css.text}>
          <FaUser />
          {name}
        </p>

        <p className={css.text}>
          <IoCall />
          {number}
        </p>
      </div>

      <button className={css.btn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </>
  );
}
