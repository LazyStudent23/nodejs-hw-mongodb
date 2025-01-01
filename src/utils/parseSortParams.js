import { sortByList } from "../db/models/Contact.js";

const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortorder }) => {
  const parsedSortOrder = sortOrderList.includes(sortorder)
    ? sortorder
        : sortOrderList[0];
    const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';
    
    return {
        sortBy: parsedSortBy,
        sortorder: parsedSortOrder,
    }
};
