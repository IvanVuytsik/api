import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/single_post/SinglePost';
import './single.css';

const Single = () => {
  return (
    <div className="single">
        <SinglePost />
        <Sidebar />
    </div>
  )
}

export default Single