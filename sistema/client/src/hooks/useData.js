import { useSelector, useDispatch } from 'react-redux';
import {
  UPDATE_MODE,
  UPDATE_ADMIN,
  UPDATE_USER,
  UPDATE_BASKET,
} from '../redux/DataRedux';

const useData = () => {
  const redux = useSelector((state) => state.DataRedux);
  const dispatch = useDispatch();

  if (!redux) throw Error('useData() must be used inside Provider');

  const changeMode = (data) => {
    dispatch(UPDATE_MODE(data));
  };

  const updateAdmin = (data) => {
    dispatch(UPDATE_ADMIN(data));
  };

  const updateUser = (data) => {
    dispatch(UPDATE_USER(data));
  };

  const updateBasket = (data) => {
    dispatch(UPDATE_BASKET(data));
  };

  return { ...redux, changeMode, updateAdmin, updateUser, updateBasket };
};

export default useData;
