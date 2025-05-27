import { showSnackbar, SnackbarStateTypes } from '../../reduxReducers/snackbarSlice';
import { useAppDispatch } from '../../reduxStore';

const useAppSnackbar = () => {
    const dispatch = useAppDispatch();

    return ({ ...props }: SnackbarStateTypes) => {
        dispatch(showSnackbar(props));
    };
};

export default useAppSnackbar;