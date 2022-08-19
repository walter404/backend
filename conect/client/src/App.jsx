import useSocket from './hooks/useSockect';
import Comments from './Layout/Comments'
import Products from './Layout/Products';
import Nav from './Layout/Nav';
function App() {
  const {doRequest, isConnected} = useSocket({
    room: 'message',
    body: "hola mundo"    
  });
  return (
    <div className="App">
      <div className='container'>
         
        <Nav  />

        <Products />
      </div>
      <Comments />
    </div>
  )
}

export default App
