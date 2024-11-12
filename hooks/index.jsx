import React, {
    useState,useEffect,useRef,useMemo,useCallback, useContext,useReducer, useLayoutEffect, createContext } from 'react';
  // Create a Context
  const AppContext = createContext();
  
  // Reducer function for useReducer
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        return state;
    }
  };
  function App() {
    const [count, setCount] = useState(0);
    const inputRef = useRef(null);
    const value = useContext(AppContext);
    const [state, dispatch] = useReducer(reducer, { count: 0 });
  
    useEffect(() => {
      console.log('useEffect: Component mounted or updated');
    }, [count]);
  
    useLayoutEffect(() => {
      console.log('useLayoutEffect: Component rendered');
    }, [count]);
  
    const computedValue = useMemo(() => {
      console.log('useMemo: Recomputing...');
      return count * 2;
    }, [count]);
  
    const increment = useCallback(() => {
      setCount((prevCount) => prevCount + 1);
    }, []);
  
    const styles = {
      container: {
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      heading: {
        textAlign: 'center',
        color: '#333',
      },
      button: {
        padding: '10px 15px',
        margin: '5px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
      buttonHover: {
        backgroundColor: '#0056b3',
      },
      input: {
        padding: '10px',
        fontSize: '16px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
      },
    };
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        <div style={styles.container}>
          <h1 style={styles.heading}>React Hooks Example</h1>
  
          <p>Count: {count}</p>
          <button style={styles.button} onClick={increment}>
            Increment Count
          </button>
  
          <input style={styles.input} ref={inputRef} placeholder="Focus on me with useRef" />
          <button
            style={styles.button}
            onClick={() => inputRef.current.focus()}
          >
            Focus Input
          </button>
  
          <p>Reducer Count: {state.count}</p>
          <button
            style={styles.button}
            onClick={() => dispatch({ type: 'increment' })}
          >
            Increment Reducer Count
          </button>
          <button
            style={styles.button}
            onClick={() => dispatch({ type: 'decrement' })}
          >
            Decrement Reducer Count
          </button>
  
          <p>Computed Value (Count * 2): {computedValue}</p>
          <p>Context Value: {JSON.stringify(value)}</p>
        </div>
      </AppContext.Provider>
    );
  }
  export default App;