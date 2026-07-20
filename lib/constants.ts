// Категорії тегів — для форми, Yup, select
export const TAG_OPTIONS = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

export type Tag = typeof TAG_OPTIONS[number];

// Категорії тегів для фільтрації
export type FilterTag = "All" | Tag;

// Меню навігації
export const MENU_TAG_OPTIONS: FilterTag[] = [
  "All",
  ...TAG_OPTIONS,
];

// Пагінація
export const NOTES_PER_PAGE = 12;

// Значення за замовчуванням
export const DEFAULT_TAG = "Todo";

export const TITLE_MIN_LENGTH = 3;
export const TITLE_MAX_LENGTH = 50;
export const CONTENT_MAX_LENGTH = 500;