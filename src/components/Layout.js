import React from 'react';

const Layout = ({children}) => {
    return (
       
            <div class="App">
            <div class="header">
                <h1>Expense Tracker</h1>
            </div>

            <div class="main">
            <div className="container">{children}</div>
            </div>

            <div class="footer">&copy;2022 Learn with Sumit</div>
            </div>
     
    );
}; 

export default Layout;