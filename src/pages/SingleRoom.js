import React, { Component } from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context'
import StyledHero from '../components/StyledHero'

export default class singleRoom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            slug: this.props.match.params.slug
        }
    }

    static contextType = RoomContext
    render() {
        const { getRoom } = this.context
        const room = getRoom(this.state.slug)
        if(!room) {
            return (
                <div className="error">
                    <h3>no such room could found...</h3>
                    <Link to="/rooms" className="btn-primary">
                        Back to rooms
                    </Link>
                </div>
            )
        }
        const {name,description, capacity, size,price,extras,breakfast,pets,images
          } = room;
        const [mainImg, ...defaultImg] = images
        console.log(defaultImg)  
        return (
            <>
            <StyledHero img={images[0]}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        Back to rooms 
                    </Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {defaultImg.map((item, index) => {
                        return  <img src={item} key={index}/>
                    })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price : ${price}</h6>
                        <h6>size : {size} SQFT</h6>
                        <h6>
                        max capacity :
                        {capacity > 1 ? `${capacity} people` : `${capacity} person`}
                        </h6>
                        <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                        <h6>{breakfast && "free breakfast included"}</h6>
                    </article>
                </div>
            </section>
            </>
        )
    }
}
