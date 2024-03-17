import { Component } from 'react'
import PropTypes from 'prop-types'

export class ErrorBoundary extends Component {

    constructor(props){
        super(props)
        this.state = {hasError: false}
    }

    static getDerivedFromError(error){
        state = {hasError: true}
    }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo)
    }

  render() {

    if(this.state.hasError){
        return <p>Something went wrong</p>
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
}

export default ErrorBoundary