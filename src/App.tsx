import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';
import { userActions } from './store-redux-toolkit/user/user-slice';
import { fetchCategories } from './store-redux-toolkit/categories/categories-slice';
import { User } from 'firebase/auth';
import { AppDispatch } from './store-redux-toolkit/store';
import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import CheckOut from './routes/checkout/CheckOut';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const authUnsuscribeListener = async () => {
      const unsuscribe = onAuthStateChangedListener((user) => {
        if (user) {
          createUserDocumentFromAuth(user);
        }

        dispatch(userActions.setCurrentUser(user as User));
      });

      return unsuscribe;
    };

    authUnsuscribeListener();
  }, []);

  useEffect(() => {
    const getCatergoriesMap = async () => {
      dispatch(fetchCategories());
    };

    getCatergoriesMap();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

// GENERAL REACT ///
//! In React i ALWAYS work with inmutable data (never modified the existing array or object, I always create a new one).
//! This is becuase when REACT check that a new object or props is registered re-renders de UI.
//! On the contrary, if I modified directly the array/object, there is no change because is the same data structure with the same adress in memory.

/// REACT ROUTE-DOM ///
/**
 * First I need to wrap the entire app in the <BrowserRouter/> in index.js.
 * All routes files should go in the "route folder". These will be the top lvl routes.
 * The routes from the "routes folder" always go in the App component.

 ** Routes: to tell the app that i'm using react-router.
 ** Route: will render a specific component when the route matches the description that I'm defining.

 *? Nested Routes: Makes the path relative to another, making a parent-child relationship. Ej: mainpage/home/shop
 *? Both component will render at the same time if the complete path is present. I need to tell react-router where should render that child component. For that I use the <Outlet /> component
 *? Outlet means where the child component must render in nested routes. Check the <Outlet /> in Navigation for a more detail explanation.
 *? With nested routes, I can make a components always present (the parent, in this case the Navigation) and render the childs based on the URL path.
 *? The page/* means that REACT will render the <Shop/> and then other routes that will be inside the Shop component (index route or dymanic URL routes).

 *? Dynamic Routes: I set them with path=":variableName". To use these parameteres in the component where the route will go, there is a hook called useParams.

 * index means that the route will match the "/" as the main page, setting a default page with the navigation as a top component in this case.
 * LINK is like an <a /> tag that tells me where the route should (to="route") go when a click or event happens.

 **/

/// REACT CONTEXT API ///
/**
 ** Store the data in a common context to all components to evade prop-drilling in the components that don`t need that data.
 ** Check the userContext file for a detailed explanation.
 */

/// REACT REDUCER ///
/**
 ** Just a function that return an object with the shape of the data that I want. The return (after the action and payload) is the new state of the app.
 ** The reducer has 2 parameters: state and action. The action has two elements: the type of action and the payload.
 ** The payload is a value important to the reducer to UPDATE the state object that is returned by the function. If I want to set some state, to what I'm setting it? That the payload.
 ** useReducer is another way to handle the state instead of useState.
 *? How to Use:
 ** 1) I create the function with the types of action and the state modifications wanted per action. I can use a if or switch statement.
 ** 2) I import the useReducer hook and pass it the function created in the last step and the initial value of the state (INITIAL_STATE)
 ** useReducer gives back a new state and a dispatch function.
 ** 3) I need to call the dispatch() function and pass it the action to do to update the state. THe dispatch action what it does, is to "dispatch" the function created in 1st.
 **    The reducer should only update the state. Nothing more.
 */

/// REACT REDUX ///
/** 0) Redux allows you to store your state in what is called a "Redux Store" and uses actions to call reducers, which in turn manipulate your state however you see fit.
 ** 1) Creo el store con createStore() y le paso el rootReducer. Esto es para modificar el store con actions.
 ** 2) El rootReducer esta en la otra file, y usa la fn combineReducer para juntar todos los reducer que yo pueda tener. Los reducer me dicen COMO SE VA A MODIFICAR el state según el tipo de acción. Estan el la file "user.reducer.js"
 ** 3) A combineReducers le paso como parametro un objeto que va a ser el store.
 **    Las keys del objeto van a ser el nombre del state (user) y las values la fn reducer que hace dispatch de las actions. Los reducer me dicen COMO SE VA A MODIFICAR el state según el tipo de acción. Estan el la file "user.reducer.js"
 ** 4) El middleware es para activar el logger, y pueda ver como y de que forma se mueve el state de Redux.
 ** 5) Con el store armado, uso el <Provider/> component en index.js para envolver toda la app y a ese Provider le paso el store que arme acá.
 ** 6) Ahora tengo que usar el reducer creado para reemplazar el userContext que ya tenia.
 ** 7) En la file "user.action.js" tengo las acciones que va a dispatchear el reducer a cada componente, que me dicen, que valor va a tomar el payload (bollean, array, etc).
 *? IMPORTANTE:
 ** 8) Una vez que tengo:
 **    A) Los types de las acciones (que se va a ejecutar). Esto es de que forma va a cambiar el estado inicial (con el payload que yo pase, si lo paso).
 **    B) Las actions (que se va a UPDATEAR según el type que yo le pase). Tienen un type y un payload(esto es una variable que se pasa al reducer de C) para UPDATEAR el estado). Ver el ejemplo de user.
 **    C) El reducer (como se va a modificar el state según la action que yo le pase, que traem el type y el payload(variable)).
 ** 9) Con todo listo, puedo usar dispatch() y usar la action donde quiero actualizar el state. En este caso, se usa el dispatch para actualizar el el usuario que se authentico.
 ** 10) Como uso los valores de redux en los componentes?
 **     Para extraer data del store de Redux uso un hook llamado useSelector. Le paso un función (que toma como param todo el state) para ver que quiero extraer del store.

 ** ACLARACIÓN: Una cosa es USAR el estado (para esto uso useSelector()) y otra SETEAR un nuevo estado (para esto uso dispatch() y mando una action).
 *! NOTA 1: No importa que parte del store de redux se actualiza, todo Component que tenga useSelector va a hacer un re-rendering (aunque ese Component no use el state de redux).

 *? RESUMEN DE COMO FUNCIONA REDUX:
 ** Hago un click y genero un evento:
 ** - Para hacer algo con ese evento uso DISPATCH que va a DISPARAR una ACTION ({type: acción a realizar, payload: data a modificar en el state})
 ** - Esta acción va al REDUX store (quien tiene el estado) y es actualizado mediante el REDUCER. El reducer toma el state actual y lo combina con la ACTION para obtener el nuevo state.
 ** - Para usar el valor del estado del store se usa la función useSelect(), que recibe el estado como argumento.

 ** Redux-Re_Select:
  ** createSelector() crea un memoized selector para que solo se haga el re-render si se usa el pedazo del state en el store que yo quiero.
 */

/**
 ** REDUX TOOLKIT
 ** 1) Creo el REDUX store con configureStore.
 ** Ahi ya le paso como quiero que sea el store, cual son los state que va a manejar y las funciones reducer. Ya no es necesario el root-reducer ni combinar los diferentes reducers en uno solo.
 ** 2) Ahora creo un "SLICE" (que es lo que le voy a pasar al store cuando lo configuro) del pedazo del store que quiero manejar. Esto va a tener un nombre (ej: user) y un estado inicial (initial state) que va a ser lo que se va a ir cambiando a lo largo de la app.
 ** 3) Luego de esto el "Slice" tiene una key llamada "reducer" que van a ser lo que yo quiero que se modifique cuando se ejecuten las acciones (NO SON LAS ACTIONS!!! en si mismas).
 ** 4) Esto se escribe como funciones, reciben el state y lo que se se va a modificar. Las acciones pueden ejecutarse de manera mutable. El payload se pasa como action.payload.
 ** ¿Como uso esto ahora en la app? ¿Como hago para dispatch las actions?
 ** 5) Puedo usar *nombre del slice*.actions.*nombre del reducer*. Esto va a generar actions automáticas con types automáticos que puedo exportar para usar.
 ** 6) Despues de eso, eso usa useDispatch() en los lugares que quiero setear el nuevo estado. A la función se le pasa el payload.
 ** Redux-thunk:
 ** 7) Para el uso de funciones async (fetch or send) con redux. Se con el toolkit se usa createAsyncThunk. Bastante facil de usar. Ver ejemplos en los slices.
 ** 8) De esta forma puedo sacar de app.js lo que es async y ponerlo en el estado de redux. En app solo queda el useEffect con el dispatch a el thunk creado.
 */
