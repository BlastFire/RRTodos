import { getTodos, createTodo } from '../lib/todoServices'
import { showMessage } from './messages'

const initState = {
    todos: [],
    currentTodo: ''
}

export const TODO_ADD = 'TODO_ADD';
export const TODOS_LOAD = 'TODOS_LOAD';
const CURRENT_UPDATE = 'CURRENT_UPDATE';

export const updateCurrent = (val) => ({ type: CURRENT_UPDATE, payload: val });
export const loadTodos = (todos) => ({ type: TODOS_LOAD, payload: todos });
export const addTodo = (todo) => ({ type: TODO_ADD, payload: todo });
export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(showMessage("Loading the todos.."))
        getTodos()
            .then(todos => dispatch(loadTodos(todos)))
    }
}
export const saveTodo = (name) => {
    return (dispatch) => {
        dispatch(showMessage("Todo is saved"))
        createTodo(name)
            .then(res => dispatch(addTodo(res)))
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case TODO_ADD:
            //return {...state, todos: state.todos.concat(action.payload)}
            return { ...state, currentTodo: '', todos: [...state.todos, { ...action.payload }] }
        case TODOS_LOAD:
            return { ...state, todos: action.payload }
        case CURRENT_UPDATE:
            return { ...state, currentTodo: action.payload }
        default:
            return state;
    }
}