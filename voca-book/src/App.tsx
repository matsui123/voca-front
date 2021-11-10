import './App.css';
import {useState} from 'react';
import words from './example.json';

function App(){
  const [en,setEn] = useState<string>('');
  const [jp,setJp] = useState<string>('');
  const [memo,setMemo] = useState<string>('');

  const handleEn = (e:any) => setEn(e.target.value);
  const handleJp = (e:any) => setJp(e.target.value);
  const handleMemo = (e:any) => setMemo(e.target.value);

  type Words = {
    en:string,
    ja:string,
    memo:string
  }


  return (
    <>
    <section className='center'>
      <h1>VOCA BOOK</h1>
      <div className='input-area'>
        <div className='flex'>
          <input type="text" value={en} placeholder="English" onChange={handleEn} />
          <input type="text" value={jp} placeholder="日本語" onChange={handleJp} />
          <input type="text" value={memo} placeholder="メモ" onChange={handleMemo} />
          <button>登録</button>
        </div>
        <div className='flex-table'>
          <table>
                <tr>
                  <th>英語</th>
                  <th>日本語</th>
                  <th>メモ</th>
                </tr>
                {words.map(word =>
                    <tr>
                      <td>{word.en}</td>
                      <td>{word.ja}</td>
                      <td>{word.memo}</td>
                    </tr>
                )}
          </table>
        </div>
      </div>
    </section>
    </>
  );
}

export default App;
