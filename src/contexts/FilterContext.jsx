import { createContext } from "react";

const FilterContext = createContext({
    filtered: '',
    setFiltered: () => { }
})

export default FilterContext