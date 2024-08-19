import { useParams } from 'react-router-dom';

function EpigramDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>에피그램 상세페이지 </h1>
      <p>에피그램 ID: {id}</p>
    </div>
  );
}

export default EpigramDetail;
