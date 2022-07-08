import './header.css'
import background from '../../images/bg.png'

const Header = () => {
  return (
    <div className="header">
        <div className="titles">
            <span className="title-sm">Programming & Design</span>
            <span className="title-lg">Blog</span>
        </div>
        <img className="header-img" src={background} alt="" />
    </div>

  )
}

export default Header