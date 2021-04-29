import { AppBar, Button, Toolbar, Typography, makeStyles, Box, createStyles, Theme, Link } from '@material-ui/core'
import React from 'react'
import { AccountCircle } from '@material-ui/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme: Theme) => createStyles({
    grow:{
        flexGrow:1
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    buttons: {
        marginLeft: '5ch'
    }
}))

export default function NavBar() {
    const classes =useStyles()
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <Typography variant="h6" noWrap className={classes.title}>
                            <Link href="/" color="inherit">
                                The Profit Professor
                            </Link>
                        </Typography>
                    </Box>
                    <div className={classes.buttons}>
                        <Button onClick={() => window.location.href = "/products"} style={{color:'white', fontWeight:'bold'}}>Products</Button>
                    </div>
                    <div className={classes.buttons}>
                        <Button onClick={() => window.location.href = "/vendors"} style={{color:'white', fontWeight:'bold'}}>Vendors</Button>
                    </div>
                    <div className={classes.buttons}>
                        <Button onClick={() => window.location.href = "/marketplaces"} style={{color:'white', fontWeight:'bold'}}>Marketplaces</Button>
                    </div>
                    <div className={classes.buttons}>
                        <Button startIcon={<AccountCircle />} />
                    </div>
                    
                </Toolbar>
            </AppBar>
        </div>
    )
}
