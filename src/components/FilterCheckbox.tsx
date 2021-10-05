import _ from "lodash";
import { useContext } from "react";
import { FilterContext } from "./Filters";

type FilterCheckboxProps = {
  text?: string;
  path: string;
};

function FilterCheckbox(props: FilterCheckboxProps): JSX.Element {
  const { filters, setSetting } = useContext(FilterContext);

  return (
    <label>
      <input
        type="checkbox"
        checked={_.get(filters, props.path)}
        onChange={(event) =>
          setSetting(`filters.${props.path}`, event.target.checked)
        }
      />
      <span>{props.text}</span>
    </label>
  );
}

export default FilterCheckbox;
