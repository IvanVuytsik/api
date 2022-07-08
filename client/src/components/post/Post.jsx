import './post.css';
import { Link } from 'react-router-dom';

function Post({post}) {

  const publicFolder = "https://blog-tsq.herokuapp.com/images/";

  return (
    <div className="post">
        {post.photo && (
          <img src={publicFolder + post.photo} alt="" className="post-img" />
        )}

        <div className="post-info">
            <div className="post-ctgs">
                {post?.categories.map((c, index) => (
                  <span className="post-ctg" key={index}>{c.name}</span>
                ))}
            </div>

            <Link to={`/post/${post._id}`} className="link">
              <span className="post-title">{post.title}</span>
            </Link>

            <hr/>
            <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="post-desc">{post.desc}</p>
    </div>
  )
}

export default Post