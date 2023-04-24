import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_MODE, UPDATE_ADMIN } from '../redux/DataRedux';

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

  return { ...redux, changeMode, updateAdmin };
};

export default useData;
