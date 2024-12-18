import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import {
  Counter,
  FilterGroup,
  FilterLabel,
  FiltersBar,
  IconButton,
  Select,
} from "./style";

export type FilterValue = "all" | "active" | "completed";
export type SortValue = "newest" | "oldest";

type FiltersProps = {
  filter: FilterValue;
  onFilterChange: (next: FilterValue) => void;
  sort: SortValue;
  onSortToggle: () => void;
  total: number;
  visible: number;
};

const Filters = ({
  filter,
  onFilterChange,
  sort,
  onSortToggle,
  total,
  visible,
}: FiltersProps) => {
  return (
    <FiltersBar>
      <FilterGroup>
        <FilterLabel htmlFor="task-filter">Filtrar</FilterLabel>
        <Select
          id="task-filter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as FilterValue)}
        >
          <option value="all">Todas</option>
          <option value="active">Activas</option>
          <option value="completed">Completadas</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel as="span">Ordenar</FilterLabel>
        <IconButton
          type="button"
          onClick={onSortToggle}
          aria-label={
            sort === "newest"
              ? "Ordenar de más antiguas a más recientes"
              : "Ordenar de más recientes a más antiguas"
          }
          title={sort === "newest" ? "Recientes primero" : "Antiguas primero"}
        >
          {sort === "newest" ? (
            <ArrowDownNarrowWide size={18} />
          ) : (
            <ArrowUpNarrowWide size={18} />
          )}
        </IconButton>
      </FilterGroup>

      <Counter>
        {visible} de {total}
      </Counter>
    </FiltersBar>
  );
};

export default Filters;
