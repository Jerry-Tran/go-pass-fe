import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const LogoCarousel = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = 150000
    const duration = 2000
    const stepTime = Math.abs(Math.floor(duration / end))

    const timer = setInterval(() => {
      start += 500
      setCount(start)
      if (start === end) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [])

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    swipe: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  }

  const logos = [
    'https://www.ibm.com/brand/experience-guides/developer/b1db1ae501d522a1a4b49613fe07c9f1/01_8-bar-positive.svg',
    'https://assets-global.website-files.com/60859bd6bcdbd1376fd8504b/64005db3442ed885977389f5_Slack_icon_2019.svg.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-CpLdfgC2c-1HIcsBIeXl0rYVeb1IwsVHw&s',
    'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvpQr7jRfGRZXz54j5HdGf6MDP8w5l53a3UQ&s',
    'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNUZjVVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1e33a76da9d8f7e94a141a1215c9c86588cad196/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/Logo%20-%20%20Gradient%20blue%20background%20(1).png'
  ]

  return (
    <section className='logo-carousel py-12 bg-white'>
      <h2 className='text-center text-2xl font-semibold mb-10'>
        {count.toLocaleString()}+ businesses trust Go Pass Manager
      </h2>
      <Slider {...settings}>
        {logos.map((src, index) => (
          <div key={index} className='px-4'>
            <img src={src} alt={`Company Logo ${index + 1}`} className='h-12 mx-auto' />
          </div>
        ))}
      </Slider>
    </section>
  )
}
