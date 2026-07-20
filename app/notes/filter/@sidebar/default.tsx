import Link from "next/link";
import { MENU_TAG_OPTIONS } from "@/lib/constants";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() { 
    return (
        <ul className={css.menuList}>
            {MENU_TAG_OPTIONS.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
}