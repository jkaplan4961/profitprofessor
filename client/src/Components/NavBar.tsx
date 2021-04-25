import { AppBar, IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { AccountCircle } from '@material-ui/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles=makeStyles(theme => ({
    title:{
        flexGrow:1
    }
}))

export default function NavBar() {
    const classes =useStyles()
    return (
        <div className="navbar">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        The Profit Professor
                    </Typography>
                    <IconButton edge="end" >
                        <AccountCircle />
                        <PersonAddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}
