import React from 'react'
import AppHeader from '../common/AppHeader'
import MenuHeader from '../common/MenuHeader'
import AppFooter from '../common/AppFooter'
import Breadcrumbs from './Breadcrumbs'

const Layout = ({ children, breadcrumbs }) => {
    return (
        <div>
            <AppHeader />
            <MenuHeader />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <main>{children}</main>
            <AppFooter />
        </div>
    )
}

export default Layout