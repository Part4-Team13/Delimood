import { useState } from 'react';
import Modal from './components/Modal/commentDeleteModal';

function App() {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Confirmed!');
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        icon={<img src='/path/to/icon.svg' alt='Icon' />}
        message='정말 이 작업을 수행하시겠습니까?'
        buttons={[
          {
            text: '취소',
            onClick: () => setIsModalOpen(false),
            variant: 'secondary',
          },
          {
            text: '확인',
            onClick: handleConfirm,
            variant: 'primary',
          },
        ]}
      />
    </>
  );
}

export default App;

// import { useState } from 'react';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h1>Vite + React</h1>
//       <div className='card'>
//         <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
//     </>
//   );
// }

// export default App;
