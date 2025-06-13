import Header from '../components/header/Header'
import SignupSignin from '../components/signup-signin/SignupSignin'
import '../App.css'

const Signup = () => {
  return (
    <div>
        <Header/>
        <div className="wrapper">
          <SignupSignin />
        </div>
    </div>
  )
}

export default Signup