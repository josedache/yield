import { useStoreSelector } from "./useStoreSelector";
import { useStoreDispatch } from "./useStoreDispatch";
import { toggleIconOnlyMenuAction } from "configs/store-slice";

function useIconOnlyMenu() {
    const dispatch = useStoreDispatch();
    const isIconOnly = useStoreSelector((state) => state.global.isIconOnly);

    function toggleIconOnlyMenu(payload?: boolean) {
        dispatch(
            toggleIconOnlyMenuAction(typeof payload === "boolean" ? payload : undefined)
        );
    }

    return { isIconOnly, toggleIconOnlyMenu };
}

export default useIconOnlyMenu;
