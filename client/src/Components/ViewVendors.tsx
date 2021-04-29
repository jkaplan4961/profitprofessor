import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles, Grid } from '@material-ui/core'
import React, { useEffect, useContext, useState } from 'react'
import { TokenContext } from '../Context/TokenContext'

const useStyles=makeStyles(theme => ({
        root: {
            maxWidth: 345,
            margin: '10px'
        },
        media: {
            height: 140,
        },
}))

type Vendor= {
    company: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string
}

export default function MarketplaceCard() {
    const classes =useStyles()
    const [token, setToken ] = useContext(TokenContext)
    const [ vendors, setVendors ] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/vendor/",{
            method: "GET",
            headers: new Headers({
                "content-Type": "application/json",
                "Authorization": token,
            }),
        }).then(vendors => vendors.json())
            .then(data => {
                setVendors(data)
            })
    }, [])

    const createVendor =()=> {
        window.location.href="/Vendor/Create"
    }

    const renderCards=() => (
        <React.Fragment>

            {vendors.map((v: Vendor) => (
            <Grid item justify="center">
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {v.company}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {v.address} {v.city}, {v.state} {v.zip}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Phone Number: {v.phone}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>    
            </Grid>
            ))}
        </React.Fragment>
    )
    return (
        <div>
            <Grid container spacing={3} justify="center">
                {renderCards()}
            </Grid>
            <Card className={classes.root}>
                <CardActionArea onClick={createVendor}>
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {/* <NewMarketPlaceForm>Hello from marketplace card </NewMarketPlaceForm> */}
                        
                        Create New Vendor
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    )
}