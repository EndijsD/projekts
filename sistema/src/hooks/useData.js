import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_MODE } from '../redux/DataRedux';

const useData = () => {
  const redux = useSelector((state) => state.DataRedux);
  const dispatch = useDispatch();

  if (!redux) throw Error('useData() must be used inside Provider');

  const changeMode = (data) => {
    dispatch(UPDATE_MODE(data));
  };

  return { ...redux, changeMode };
};

export default useData;
