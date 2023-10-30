import { CustomCheckboxes } from "./index.styled";
import FilterModelIcon from '@assets/filter-model-icon.svg';
import { Filter } from "@/types/Enum";

interface Props {
    filters: string[];
    valueChecked: string;
    field: Filter;
    handleFilter: (check: boolean, field: Filter, value: string) => void;
    title: string;
}

const FilterHomePage = (props: Props) => {
    const { filters, valueChecked, field, handleFilter, title } = props;

    return(
        <div>
            <div className="flex mt-2">
                <img alt="filter-model-icon" src={FilterModelIcon} style={{ width: '15px' }}/>
                <p className="font-semibold text-neutral-100 ml-2">{title}</p>
            </div>
            {filters.map((item: string) => (
                <div className="w-full" key={item}>
                    <CustomCheckboxes>
                        <label className="container">
                            <input type="checkbox" checked={valueChecked === `${item}`} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFilter(event.target.checked, field, `${item}`)}/>
                            <span className="checkmark"></span>
                            {item}
                        </label>
                    </CustomCheckboxes>
                </div>
            ))}
        </div>
    );
};

export default FilterHomePage