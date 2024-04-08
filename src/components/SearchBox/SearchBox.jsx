import css from "./SearchBox.module.css";

export default function SearchBox({ searchValue, handleSearch }) {
  return (
    <div className={css.inputWrapper}>
      <p>Find contact by name</p>
      <input
        className={css.field}
        type="text"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
}
