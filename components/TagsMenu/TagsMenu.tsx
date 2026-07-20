"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import Link from "next/link";
import { MENU_TAG_OPTIONS } from "@/lib/constants";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return (
    <div ref={menuRef} className={css.menuContainer}>

      <button onClick={toggleMenu}
        className={css.menuButton}
        aria-haspopup="true"
        aria-expanded={isOpen}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {MENU_TAG_OPTIONS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                onClick={toggleMenu}
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}