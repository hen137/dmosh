// App.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store.ts';
import { updatesPos } from './redux/mouse.ts';
import Stream from './components/stream/stream.tsx';
import Screen from './components/screen/screen.tsx';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const handleWindowMouseMove = (event) => {
    dispatch(updatesPos({xPos: event.clientX - (window.innerWidth / 2), yPos: -1 * (event.clientY - (window.innerHeight / 2))}))
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  return (
    <>
      <Stream />
      {/* <Screen /> */}
    </>
  );
};

export default App;
