import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles, Grid, Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import React, { useEffect, useContext, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContext'
import NewProductForm from './NewProductForm'

const useStyles=makeStyles(theme => ({
        root: {
            maxWidth: 345,
            margin: '10px'
        },
        media: {
            height: 140,
        },
}))

type User = {
    id: number;
    username: string;
}

type FilterBody = {
    userId: number;
    vendorId?: number;
    marketplaceId?: number;
}

type Product= {
    name: string;
    description: string;
    price: number;
    manufacturer: string;
    upc: string;
    cost: number;
    part_num: string;
    shipping_cost: number;
    image: string;
    userId: number;
    marketplaceId: number;
    vendorId: number;
}

interface PropTypes {
    vendorIdParam: string;
    marketplaceIdParam: string
}

export default function ViewProducts({vendorIdParam, marketplaceIdParam}: PropTypes) {
    const classes =useStyles()
    const [token, setToken ] = useContext(TokenContext)
    const [ products, setProducts ] = useState([])
    const [ userId, setUserId ] = useState(-1)
    const [ vendorId, setVendorId ] = useState(vendorIdParam)
    const [ marketplaceId, setMarketplaceId ] = useState(marketplaceIdParam)
    const [ popUp, setPopUp ] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3001/user/me", {
            method: "POST",
            body: JSON.stringify({
                token: token
            }),
            headers: new Headers({
                "content-Type": "application/json",
            })
        }).then(user => user.json()).then(user => {
            if (user?.user?.id) {
                setUserId(user.user.id)
                const reqBody : FilterBody = {
                    userId: user.user.id
                }
                if (Number(vendorId) > 0) reqBody.vendorId = Number(vendorId)
                if (Number(marketplaceId) > 0) reqBody.marketplaceId = Number(marketplaceId)
                fetch("http://localhost:3001/product/filter", {
                    method: "POST",
                    body: JSON.stringify(reqBody),
                    headers: new Headers({
                    "content-Type": "application/json",
                    "Authorization": token,
                    }),
                })
                    .then(products => products.json())
                    .then(data => {
                        setProducts(data)
                    })
            }
            
        })
    }, [token])

    const createProduct =()=> {
        setPopUp(true)
    }

    const renderCards=() => (
        <React.Fragment>

            {products.length > 0 && products.map((p: Product) => (
            <Grid item justify="center">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => window.location.href = `/components/ProductDetail`}>
                    <CardMedia
                            className={classes.media}
                            component="img"
                            src={`data:image/png;base64, ${p.image}`}
                            title={p.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {p.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {p.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Price: {p.price}<span />Cost: {p.cost}
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
                <CardActionArea onClick={createProduct}>
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         
                        
                        Create New Product
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog title="create-product-modal" open={popUp}>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogContent>
                    <NewProductForm userId={userId} vendorId={Number(vendorId)} marketplaceId={Number(marketplaceId)} />
                </DialogContent>

            </Dialog>
<div>
<Button onClick={() => window.location.href = "./ProductDetails/"}>Complete Users Product  List</Button>

            {/* <Button variant="contained" color="primary" href="#contained-buttons">
  Complete Users Product  List
</Button> */}

</div>
        </div>
    )
}
