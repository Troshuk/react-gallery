import css from './Button.module.css';

export const Button = ({ onClick, title }) => {
  return (
    <button type="button" onClick={onClick} className={css.button}>
      {title}
    </button>
  );
};
