import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import './style.scss'
import CategoriesBanner from '../../components/CategoriesBanner/CategoriesBanner';
import { deleteFromBasket, setBasket } from '../../store/features/basketSlice';

function Detail() {

  let {id}=useParams();
  const {products}=useSelector(state=>state.data.data);
  const dispatch=useDispatch()
  const {basket}=useSelector(state=>state.basket)
  const [product,SetProduct]=useState(products?.find(pro=>pro.id==id));
  let stars=['star1','star2','star3','star4','star5'];
  const [Size,Setsize]=useState(0);
  const [toggleReviews,SettoggleReviews]=useState();
  const handleAdd=()=>{
    let currentProduct=basket.find(produc=>produc.id==product.id)
    if(currentProduct){
    dispatch(deleteFromBasket(product.id))
     
    }
   else{
    dispatch(setBasket(product));
   }
  }
  console.log(product);
  return (
    <div>
      <section className="Detail-Section">
        <div className="wrapper Product-details flex">
          <ul className='nav-list'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/shop'>{product?.Category}</Link>
          </li>
          <li style={{cursor:"pointer"}}>
          {product?.Title.length>20?product.Title.slice(0,20)+"...":product?.Title}
          </li>
          </ul>
          <Swiper   
          slidesPerView={4}
           spaceBetween={30}
           direction={"vertical"}
           className="mySwiper ProductsOtherImg">
            {
              product?.imagesOfPr?.map(images=>
                (  <SwiperSlide key={images}>
                   <img src={`https://raw.githubusercontent.com/T-Ulvi/Fashion-Store/main/${images}`} alt="" />
                </SwiperSlide>)
              )
            }
          </Swiper>

          <Swiper   
           spaceBetween={30}
           navigation={true}
            modules={[Navigation]} className="mySwiper productImg">
            {
              product?.imagesOfPr?.map(images=>
                (  <SwiperSlide key={images}>
                   <img src={`https://raw.githubusercontent.com/T-Ulvi/Fashion-Store/main/${images}`} alt="" />
                </SwiperSlide>)
              )
            }
          </Swiper>

          <div className='product-texts'>
            <h3 className='productDetailTitle'>{product?.Title}</h3>
            <div className="reviews">
                  <span className='stars'>
                  {
                    stars.map((star,index)=>{
                    return  <i key={star} className={index<product?.stars?'fa-star fas':"fa-star far"}></i>
                    }
                  )
                  }
                </span>
                <span className="ml-10">{product?.stars}.0 &nbsp; | &nbsp;  {product?.comments} reviews</span>
            </div>
            <ul className='product-prices flex align-center'>
             <p className='priceWord'>Price: </p>
             <li className='ml-10'> ${product?.MainPrice}</li>
            <li>${product?.FromPrice}</li>
            </ul>
            <div className='sizes mt-30'>
              <h3>Size: {product?.sizes.find((size,index)=>index===Size)}</h3>
              <ul className='ProductSizes flex'>
                {product?.sizes.map((size,index)=>(
                  <li className={Size===index?'activeSize':''} key={size} onClick={()=>Setsize(index)}>{size}</li>
                ))}
              </ul>
            </div>
            <div className='flex align-center mt-20'>
              <button className='btn-add' onClick={()=>handleAdd(product)}>{basket.find(item=>item.id==product.id)?"ADDED TO CART":"ADD TO CART"}</button>
              <span className='heartdetail'>
                <i className='far fa-heart'></i>
              </span>
            </div>
            <ul className='detailsUL mt-20'>
                  <h3>Product's Details:</h3>
                  {
                    product?.details.map(detail=>(
                    <li>{detail}</li>
                    ))
                  }
            </ul>
          </div>
        </div>
        </section>

      <section className="ProductDescription">
        <div className="wrapper ">
          <ul className="Comment-buttons">
            <div className={toggleReviews?"red-stick active":'red-stick'}></div>
            <li className="Descriptionbtn" onClick={()=>SettoggleReviews(false)}>Product Description</li>
            <li className="ReviewBtn" onClick={()=>SettoggleReviews(true)}>Reviews</li>
          </ul>
          <div className={!toggleReviews?"Description":'height-0'}>
            <p className="mt-30">
            Oversize fit: Ekstra bol, geni?? kesimdir. ??ok bol tercih etmiyorsan??z, kendi bedeninizden 1 beden k??????k alman??z tavsiye edilir
              Bir ??r??n, birden fazla sat??c?? taraf??ndan sat??labilir. Birden fazla sat??c?? taraf??ndan sat????a sunulan ??r??nlerin sat??c??lar?? ??r??n i??in belirledikleri fiyata, sat??c?? puanlar??na, teslimat stat??lerine, ??r??nlerdeki promosyonlara, kargonun bedava olup olmamas??na ve ??r??nlerin h??zl?? teslimat ile teslim edilip edilememesine, ??r??nlerin stok ve kategorileri bilgilerine g??re s??ralanmaktad??r.</p>
        
            <p className="mt-20">Konsept ??ekimlerinde renkler ??????k farkl??l??????ndan dolay?? de??i??iklik g??sterebilir. Mankenin ??zerindeki ??r??n M bedendir.Kampanya fiyat??ndan sat??lmak ??zere 100 adetten fazla stok sunulmu??tur.Listelenen fiyat 23 Temmuz 2022 tarihine kadar ge??erlidir.
Bu ??r??n indirim kampanyas??na dahil de??ildir.</p>
          </div>
        
          <div className={!toggleReviews?"height-0":'Comments'}>
          <div class="person">
              <h3>John Smith 
                <span class="reviews ml-24"> 
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                </span> 
            </h3>
            <p class="time color-g">09 July, 2021</p>
            <p class="color-g comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            </p>
            </div>
          </div>
        </div>
      </section>
      <section class="productSection py-96">
    <div class="wrapper">
      <CategoriesBanner/>
    </div>
    </section>
    </div>
  )
}

export default Detail