import axios from 'axios';

const GET_TAGS = 'GET_TAGS';

export const getTags = () => {
  return async(dispatch) => {
    try{
      const tags = (await axios.get('/api/tag')).data;
      dispatch({
        type: GET_TAGS,
        tags
      })
    }
    catch(error){
      console.log(error);
    }
  }
}

export default(state = [], action) => {
  if(action.type === GET_TAGS){
    return action.tags;
  }
  return state;
}