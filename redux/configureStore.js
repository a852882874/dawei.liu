import { createStore, combineReducers, applyMiddleware } from 'redux'
import { calculate } from './reducer';//导入所有的reducer

const rootReducer = combineReducers({//入口
    calculate,
});
// 创建store的两个放式
// let store = createStore(rootReducer);//方式一

/**
 * 让你可以发起一个函数来替代 action。
 * 这个函数接收 `dispatch` 和 `getState` 作为参数。
 *
 * 对于（根据 `getState()` 的情况）提前退出，或者异步控制流（ `dispatch()` 一些其他东西）来说，这非常有用。
 *
 * `dispatch` 会返回被发起函数的返回值。
 */
const thunk = store => next => action =>
typeof action === 'function' ?
  action(store.dispatch, store.getState) :
  next(action)

//方式二
const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
        Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        })
        throw err
    }
}

let createStoreWithMiddleware = applyMiddleware(thunk,logger, crashReporter)(createStore);
let store = createStoreWithMiddleware(rootReducer);
export const getStore = () => {
    return store
}