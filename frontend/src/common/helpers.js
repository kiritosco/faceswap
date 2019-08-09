import {navSections} from "./consts";

export const getNavSection = (id) => {
    return navSections.find(el => {
        return el.id === id;
    })
};