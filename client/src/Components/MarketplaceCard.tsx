import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core'
import { render } from '@testing-library/react'
import React from 'react'
const useStyles=makeStyles(theme => ({
        root: {
            maxWidth: 345,
            margin: '10px'
        },
        media: {
            height: 140,
        },
}))
const Marketplaces =[
    {
    name:"eBay", 
    commissionrate: "15",
    image:"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"
    },
    {
        name:"Amazon",
        commissionrate: "15",
        image: "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"
    }
]
export default function MarketplaceCard() {
    const classes =useStyles()
    const createMarketplace =()=> {
window.location.href="/MarketPlace/Create"
    }
    const renderCards=() => (
        <React.Fragment>

            {Marketplaces.map(m => (
    
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src={`data:image/png;base64, ${m.image}`}
                        title={m.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {m.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        Commission Rate: {m.commissionrate}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>    
            ))}
        </React.Fragment>
    )
    return (
        <div>
            {renderCards()}
            <Card className={classes.root}>
                <CardActionArea onClick={createMarketplace}>
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        Create New Marketplace
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    )
}
