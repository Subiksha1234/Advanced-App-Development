import { Suspense } from "react"
import PropTypes from 'prop-types'
import loader from '../assets/images/Loader.gif'
import '../assets/css/LazySuspense.css'

const LazySuspense = ({component:Component, ...rest}) => {
  return (
    <div className="suspense">      
    <Suspense fallback={<img src={loader} alt = "Loader"/>}>
        <Component {...rest}/>
    </Suspense>
    </div>
  )
}

LazySuspense.propTypes = {
    component: PropTypes.element.isRequired
}
export default LazySuspense