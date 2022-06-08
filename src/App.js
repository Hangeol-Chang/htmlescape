import './App.css';
import Hello from './component/Hello'

function App() {
  const name = "한걸"
  const obj = {
    name : '링크',
    url : 'https://www.naver.com'
  }
  return (
    <div className="App">
      <h1 style={{
        color: "#f0f",
        backgroundColor: "green",
      }}>
        Hello, {name}
      </h1>
      <a href={obj.url}>{obj.name}</a>

      <Hello />
    </div>
  );
}

export default App;
