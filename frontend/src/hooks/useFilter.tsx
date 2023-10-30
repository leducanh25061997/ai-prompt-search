import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import querystring from 'query-string';
import { debounce, isArray, set } from 'lodash';
import { FilterParams } from '@/types/Filter';

interface Props {
  onFetchData?: (filter: FilterParams) => void;
  defaultFilter?: FilterParams;
}

const initialFilter = {
  page: 1,
};

export const useFilter = ({ onFetchData, defaultFilter = initialFilter }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<FilterParams>(defaultFilter);

  const filterFromQuery = (query: any) => {
    const newFilter = {
      ...query,
      page: query.page ? +query.page : filter.page,
    };
    if (query.sort) {
      set(newFilter, 'orders', isArray(query.orders) ? query.orders : [query.orders]);
    }
    return newFilter;
  };

  React.useEffect(() => {
    const params = querystring.parse(location.search, {
      arrayFormat: 'bracket',
    });
    const newFilter: FilterParams = filterFromQuery(params);
    setFilter(newFilter);
    const handleFetchData = debounce(() => onFetchData?.call(null, newFilter), 300);
    handleFetchData();
    return () => handleFetchData.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const onFilterToQueryString = (values: any): void => {
    navigate(
      {
        pathname: location.pathname,
        search: `?${querystring.stringify(
          {
            ...values,
            page: values.page > 0 ? values.page : 0,
          },
          { arrayFormat: 'bracket', skipNull: true, skipEmptyString: true }
        )}`,
      },
      { replace: true }
    );
  };

  return { filter, onFilterToQueryString };
};
