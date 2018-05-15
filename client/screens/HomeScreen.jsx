import React, { Component } from 'react'
import { connect } from  'react-redux'


class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>{`Welcome ${this.props.userName || ''}!`}</h1>
                <h3>This is the home screen</h3>
            </div>
        )
    }
}
const mapState = state =>({
    userName: state.User.name
})

const mapDispatch = dispatch => ({

})
export default connect(mapState, mapDispatch)(HomeScreen)