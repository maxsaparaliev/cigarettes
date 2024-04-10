export enum SUPABASE_TABLES {
  MANUFACTURERS = "manufacturers",
  COUNTRIES = "countries",
  products = "products",
}

export const PAGE_SIZE = 9;

export const SORTINGS = {
  TITLE_ASCENDING: "titleAscending",
  TITLE_DESCENDING: "titleDescending",
  PRICE_ASCENDING: "priceAscending",
  PRICE_DESCENDING: "priceDescending",
  DEFAULT: "default",
};

export const SIDEBAR_LABELS = {
  MANUFACTURER: "Производитель",
  COUNTRY: "Страна",
};

export const SORT_VALUES = {
  [SORTINGS.TITLE_ASCENDING]: {
    column: "title",
    ascending: true,
  },
  [SORTINGS.TITLE_DESCENDING]: {
    column: "title",
    ascending: false,
  },
  [SORTINGS.PRICE_ASCENDING]: {
    column: "price",
    ascending: true,
  },
  [SORTINGS.PRICE_DESCENDING]: {
    column: "price",
    ascending: false,
  },
  [SORTINGS.DEFAULT]: null,
};

export const LOCALSTORAGE_KEYS = {
  ITEMS: "items",
};
