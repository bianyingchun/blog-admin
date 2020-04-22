import React from 'react'
import {withRouter} from 'react-router-dom'
import Menu from './menu'

const Side:React.FC<any> = () => {
    return (
        <>
    <div>Side</div>
    <Menu/>
    </>)
}

export default withRouter(Side)