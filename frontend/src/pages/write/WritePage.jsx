import CreatePostForm from './components/CreatePostForm';
import '@/styles/Write.css';

const WritePage = () => {
  return (
    <div className='write-background'>
      <div className='write-box'>
        <CreatePostForm />
      </div>
    </div>
  );
};

export default WritePage;
