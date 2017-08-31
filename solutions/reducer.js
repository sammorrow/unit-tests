// CONSTANTS //

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

// ACTION CREATORS //

export const addTask = task => ({type: ADD_TASK, task})

export const removeTask = task => ({type: REMOVE_TASK, task})

// REDUCER //

const initialState = {
  tasks: [
    {
      name: 'test',
      complete: false
    }
  ],
  check: 'ye'
}

export default function(state = initialState, action){
  let newState = Object.assign({}, state);
  switch (action.type) {
    case ADD_TASK:
      newState.tasks = newState.tasks.concat(action.task);
      return newState;
    case REMOVE_TASK:
      newState.tasks = newState.tasks.filter(el => el.name !== action.task.name)
      return newState;
    default:
      return state;
  }
}
